import fs from 'fs'
import path from 'path'

const LOG_FILE = path.resolve(process.cwd(), 'devtools.log')

function writeLog(message: string) {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] ${message}\n`
  fs.appendFileSync(LOG_FILE, logMessage)
}

export const logger = {
  info: (message: string) => {
    console.log(message)
    writeLog(`INFO: ${message}`)
  },
  error: (message: string) => {
    console.error(message)
    writeLog(`ERROR: ${message}`)
  },
  debug: (message: string) => {
    console.debug(message)
    writeLog(`DEBUG: ${message}`)
  }
} 