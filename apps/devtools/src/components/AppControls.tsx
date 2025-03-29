'use client';

import { useState, useEffect } from 'react';
import { ProcessInfo } from '@/types/process';

interface AppConfig {
  name: string;
  port: number;
}

const APPS: AppConfig[] = [
  { name: 'portfolio', port: 3000 },
  { name: 'bidwriter', port: 3001 },
  { name: 'omcanvas', port: 3002 },
  { name: 'cv360', port: 3003 },
];

export default function AppControls() {
  const [processes, setProcesses] = useState<Record<string, ProcessInfo>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProcesses();
    const interval = setInterval(fetchProcesses, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchProcesses = async () => {
    try {
      console.log('Fetching process states...');
      const response = await fetch('/api/processes');
      if (!response.ok) {
        const error = await response.json();
        console.error('Failed to fetch processes:', error);
        setError(error.error || 'Failed to fetch processes');
        return;
      }
      const data = await response.json();
      console.log('Received process states:', data);
      setProcesses(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching processes:', error);
      setError('Failed to fetch processes');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (app: string, action: 'start' | 'stop') => {
    try {
      console.log(`${action}ing ${app}...`);
      setError(null);
      
      const response = await fetch('/api/processes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app, action }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        console.error(`Failed to ${action} ${app}:`, error);
        setError(error.error || `Failed to ${action} ${app}`);
        return;
      }

      // Refresh process states after action
      await fetchProcesses();

      // Open browser if app was started successfully
      if (action === 'start') {
        const appConfig = APPS.find(a => a.name === app);
        if (appConfig) {
          console.log(`Opening ${app} in browser at port ${appConfig.port}`);
          window.open(`http://localhost:${appConfig.port}`, '_blank');
        }
      }
    } catch (error) {
      console.error(`Error ${action}ing ${app}:`, error);
      setError(`Failed to ${action} ${app}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {APPS.map(({ name, port }) => {
          const process = processes[name];
          const isRunning = process?.status === 'running';

          return (
            <div
              key={name}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold capitalize mb-2">{name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${
                  isRunning ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-sm text-gray-600">
                  {isRunning ? 'Running' : 'Stopped'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Port: {port}
              </p>
              {process?.startedAt && (
                <p className="text-sm text-gray-500 mb-4">
                  Started: {new Date(process.startedAt).toLocaleString()}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(name, 'start')}
                  disabled={isRunning}
                  className={`px-4 py-2 rounded ${
                    isRunning
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  Start
                </button>
                <button
                  onClick={() => handleAction(name, 'stop')}
                  disabled={!isRunning}
                  className={`px-4 py-2 rounded ${
                    !isRunning
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Stop
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 