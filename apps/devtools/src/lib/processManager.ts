import { spawn, ChildProcess } from 'child_process'
import fs from 'fs'
import path from 'path'

const processesFile = path.resolve(process.cwd(), 'processes.json')

type AppName = 'portfolio' | 'bidwriter' | 'omcanvas' | 'cv360'

interface AppProcess {
  pid: number
  port: number
  app: AppName
}

const APP_PORTS: Record<AppName, number> = {
  portfolio: 3000,
  bidwriter: 3001,
  omcanvas: 3002,
  cv360: 3003,
}

let activeProcesses: Record<AppName, AppProcess> = {
  portfolio: null,
  bidwriter: null,
  omcanvas: null,
  cv360: null
} as unknown as Record<AppName, AppProcess>

function loadProcesses() {
  if (fs.existsSync(processesFile)) {
    const data = fs.readFileSync(processesFile, 'utf-8')
    activeProcesses = JSON.parse(data)
  }
}

function saveProcesses() {
  fs.writeFileSync(processesFile, JSON.stringify(activeProcesses, null, 2))
}

export function getStatus(): Record<AppName, AppProcess | null> {
  loadProcesses()
  const status: Record<AppName, AppProcess | null> = {
    portfolio: null,
    bidwriter: null,
    omcanvas: null,
    cv360: null,
  }

  for (const app of Object.keys(APP_PORTS) as AppName[]) {
    if (activeProcesses[app]) {
      const { pid } = activeProcesses[app]
      try {
        process.kill(pid, 0) // Check if process is still alive
        status[app] = activeProcesses[app]
      } catch {
        status[app] = null
        delete activeProcesses[app]
      }
    }
  }

  saveProcesses()
  return status
}

export function startApp(app: AppName): boolean {
  if (activeProcesses[app]) {
    console.log(`${app} is already running.`)
    return false
  }

  const port = APP_PORTS[app]
  const child = spawn('pnpm', ['exec', 'next', 'dev', '--turbo=false', `--port=${port}`, `--filter=${app}`], {
    cwd: path.resolve('../../'),
    detached: true,
    stdio: 'ignore',
    shell: true,
  })
  child.unref()
  // Ensure child.pid is defined before using it
  if (child.pid === undefined) {
    throw new Error('Failed to start process - no PID assigned')
  }
  activeProcesses[app] = { pid: child.pid, port, app }
  saveProcesses()
  return true
}

export function stopApp(app: AppName): boolean {
  const entry = activeProcesses[app]
  if (!entry) return false

  try {
    process.kill(entry.pid)
    delete activeProcesses[app]
    saveProcesses()
    return true
  } catch (err) {
    console.error(`Failed to stop ${app}:`, err)
    return false
  }
}
