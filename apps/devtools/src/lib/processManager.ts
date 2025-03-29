import { spawn, ChildProcess } from 'child_process'
import fs from 'fs'
import path from 'path'
import { logger } from './logger'

const processesFile = path.resolve(process.cwd(), 'processes.json')
logger.info(`Processes file path: ${processesFile}`)

type AppName = 'portfolio' | 'bidwriter' | 'omcanvas' | 'cv360'

const APP_PORTS: Record<AppName, number> = {
  portfolio: 3000,
  bidwriter: 3001,
  omcanvas: 3002,
  cv360: 3003,
}

interface ProcessInfo {
  pid: number | null
  app: AppName
  status: 'running' | 'stopped'
  startedAt: string | null
  port: number
}

// Initialize with empty object, will be populated by loadProcesses
let activeProcesses: Record<AppName, ProcessInfo> = {} as Record<AppName, ProcessInfo>

function loadProcesses() {
  logger.info(`Loading processes from: ${processesFile}`)
  if (fs.existsSync(processesFile)) {
    const data = fs.readFileSync(processesFile, 'utf-8')
    logger.debug(`Loaded processes data: ${data}`)
    try {
      const processesData = JSON.parse(data)
      // Ensure all apps have the correct structure
      for (const app of Object.keys(APP_PORTS) as AppName[]) {
        if (!processesData[app] || typeof processesData[app] !== 'object') {
          processesData[app] = {
            pid: null,
            app,
            status: 'stopped',
            startedAt: null,
            port: APP_PORTS[app]
          }
        }
      }
      activeProcesses = processesData
      saveProcesses() // Save the updated structure
    } catch (err) {
      logger.error(`Error parsing processes.json: ${err}`)
      initializeProcessesFile()
    }
  } else {
    logger.info('No processes file found, initializing')
    initializeProcessesFile()
  }
}

function initializeProcessesFile() {
  const initialData = Object.keys(APP_PORTS).reduce((acc, app) => {
    acc[app as AppName] = {
      pid: null,
      app: app as AppName,
      status: 'stopped',
      startedAt: null,
      port: APP_PORTS[app as AppName]
    }
    return acc
  }, {} as Record<AppName, ProcessInfo>)
  
  fs.writeFileSync(processesFile, JSON.stringify(initialData, null, 2))
  logger.info(`Initialized processes.json: ${JSON.stringify(initialData, null, 2)}`)
  activeProcesses = initialData
}

function saveProcesses() {
  logger.info(`Saving processes to: ${processesFile}`)
  fs.writeFileSync(processesFile, JSON.stringify(activeProcesses, null, 2))
  logger.debug(`Saved processes: ${JSON.stringify(activeProcesses, null, 2)}`)
}

function isPortInUse(port: number): boolean {
  try {
    const server = require('net').createServer()
    server.listen(port, '127.0.0.1')
    server.close()
    return false
  } catch (err) {
    return true
  }
}

function killProcessOnPort(port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const { exec } = require('child_process')
    exec(`lsof -ti:${port} | xargs kill -9`, (err: any) => {
      if (err) {
        logger.error(`Error killing process on port ${port}: ${err}`)
        reject(err)
      } else {
        logger.info(`Killed process on port ${port}`)
        resolve()
      }
    })
  })
}

export function getStatus(): Record<AppName, ProcessInfo> {
  logger.info('Getting process status')
  loadProcesses()

  // Check each process
  for (const app of Object.keys(APP_PORTS) as AppName[]) {
    const processInfo = activeProcesses[app]
    if (processInfo.status === 'running' && processInfo.pid) {
      try {
        // Try to send signal 0 to check if process exists
        process.kill(processInfo.pid, 0)
        logger.info(`${app} is running with PID ${processInfo.pid}`)
      } catch (err: any) {
        // Process doesn't exist or we don't have permission
        logger.info(`${app} process ${processInfo.pid} is not running: ${err.message}`)
        processInfo.status = 'stopped'
        processInfo.pid = null
        processInfo.startedAt = null
      }
    } else {
      logger.info(`${app} has no running process recorded`)
    }
  }

  saveProcesses()
  return activeProcesses
}

export async function startApp(app: AppName): Promise<boolean> {
  logger.info(`Starting ${app}`)
  
  // Load current state from file
  loadProcesses()
  
  // Check if process is actually running
  const processInfo = activeProcesses[app]
  if (processInfo.status === 'running' && processInfo.pid) {
    try {
      process.kill(processInfo.pid, 0)
      logger.info(`${app} is already running with PID ${processInfo.pid}`)
      return false
    } catch {
      // Process is not actually running, continue with start
    }
  }

  const port = APP_PORTS[app]
  logger.info(`Using port ${port} for ${app}`)

  // Check if port is in use
  if (isPortInUse(port)) {
    logger.info(`Port ${port} is in use, attempting to kill existing process`)
    try {
      await killProcessOnPort(port)
      // Wait a bit for the port to be released
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (err) {
      logger.error(`Failed to kill process on port ${port}: ${err}`)
      return false
    }
  }

  const cwd = path.resolve('../../')
  logger.info(`Working directory: ${cwd}`)

  const command = ['--filter', app, 'exec', 'next', 'dev', `--port=${port}`]
  logger.info(`Command: pnpm ${command.join(' ')}`)

  const child = spawn('pnpm', command, {
    cwd,
    detached: true,
    stdio: 'pipe',
    shell: true,
    env: {
      ...process.env,
      FORCE_COLOR: '1',
      NODE_ENV: 'development',
      NEXT_TELEMETRY_DISABLED: '1',
      PORT: port.toString()
    }
  })

  // Log process output
  child.stdout?.on('data', (data) => {
    logger.debug(`${app} stdout: ${data.toString()}`)
  })

  child.stderr?.on('data', (data) => {
    logger.error(`${app} stderr: ${data.toString()}`)
  })

  child.on('error', (error) => {
    logger.error(`Error starting ${app}: ${error}`)
  })

  child.on('close', (code) => {
    logger.info(`${app} process closed with code: ${code}`)
  })

  child.unref()

  // Ensure child.pid is defined before using it
  if (child.pid === undefined) {
    logger.error('Failed to start process - no PID assigned')
    throw new Error('Failed to start process - no PID assigned')
  }

  logger.info(`Started ${app} with PID: ${child.pid}`)
  processInfo.pid = child.pid
  processInfo.status = 'running'
  processInfo.startedAt = new Date().toISOString()
  saveProcesses()
  return true
}

export function stopApp(app: AppName): boolean {
  logger.info(`Stopping ${app}`)
  
  // Load current state and check if process is running
  loadProcesses()
  const processInfo = activeProcesses[app]
  if (processInfo.status !== 'running' || !processInfo.pid) {
    logger.info(`${app} is not running`)
    return false
  }

  try {
    logger.info(`Killing process ${processInfo.pid} for ${app}`)
    process.kill(processInfo.pid)
    
    processInfo.status = 'stopped'
    processInfo.pid = null
    processInfo.startedAt = null
    saveProcesses()
    
    logger.info(`Successfully stopped ${app}`)
    return true
  } catch (err) {
    logger.error(`Failed to stop ${app}: ${err}`)
    return false
  }
}
