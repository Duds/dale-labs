import fs from 'fs'
import path from 'path'
import AppControls from '@/components/AppControls'

interface AppInfo {
  name: string
  port: string
}

function getApps(): AppInfo[] {
  const appsDir = path.resolve('../../apps')
  const apps = fs.readdirSync(appsDir)

  return apps
    .filter(app => fs.existsSync(path.join(appsDir, app, '.env.local')))
    .map(app => {
      const envPath = path.join(appsDir, app, '.env.local')
      const envContent = fs.readFileSync(envPath, 'utf-8')
      const port = envContent.match(/PORT=(\d+)/)?.[1] || '3000'
      return { name: app, port }
    })
}

export default function DevToolsPage() {
  const apps = getApps()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Dale Labs DevTools</h1>
        <AppControls />
      </div>
    </main>
  )
}
