import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { startApp, stopApp, getStatus } from '@/lib/processManager'
import { logger } from '@/lib/logger'

const PROCESSES_FILE = path.resolve(process.cwd(), 'processes.json')

type AppName = 'portfolio' | 'bidwriter' | 'omcanvas' | 'cv360'

const APP_PORTS: Record<AppName, number> = {
  portfolio: 3000,
  bidwriter: 3001,
  omcanvas: 3002,
  cv360: 3003,
}

export async function GET(request: Request) {
  logger.info('GET /api/processes - Fetching process states')
  
  try {
    const status = getStatus()
    logger.info(`Process status: ${JSON.stringify(status)}`)
    return NextResponse.json(status)
  } catch (err) {
    logger.error(`Error in GET /api/processes: ${err}`)
    return NextResponse.json({ error: 'Failed to get process states' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { app, action } = await request.json()
  logger.info(`POST /api/processes - ${action} ${app}`)
  
  if (!app || !action) {
    logger.error('Missing app or action')
    return NextResponse.json({ error: 'Missing app or action' }, { status: 400 })
  }
  
  if (!Object.keys(APP_PORTS).includes(app)) {
    logger.error(`Invalid app: ${app}`)
    return NextResponse.json({ error: 'Invalid app' }, { status: 400 })
  }
  
  try {
    if (action === 'start') {
      const success = await startApp(app as AppName)
      if (success) {
        logger.info(`Successfully started ${app}`)
        return NextResponse.json({ status: 'started' })
      } else {
        logger.error(`Failed to start ${app}`)
        return NextResponse.json({ error: 'Failed to start app' }, { status: 500 })
      }
    } else if (action === 'stop') {
      const success = stopApp(app as AppName)
      if (success) {
        logger.info(`Successfully stopped ${app}`)
        return NextResponse.json({ status: 'stopped' })
      } else {
        logger.error(`Failed to stop ${app}`)
        return NextResponse.json({ error: 'Failed to stop app' }, { status: 500 })
      }
    } else {
      logger.error(`Invalid action: ${action}`)
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (err) {
    logger.error(`Error in POST /api/processes: ${err}`)
    return NextResponse.json({ error: 'Failed to manage process' }, { status: 500 })
  }
} 