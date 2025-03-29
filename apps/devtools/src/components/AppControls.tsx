'use client';

import { useState, useEffect } from 'react';
import { ProcessInfo } from '@/types/process';

const APPS = ['portfolio', 'bidwriter', 'devtools'];

export default function AppControls() {
  const [processes, setProcesses] = useState<Record<string, ProcessInfo>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProcesses();
    const interval = setInterval(fetchProcesses, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchProcesses = async () => {
    try {
      const response = await fetch('/api/processes');
      const data = await response.json();
      setProcesses(data.processes);
    } catch (error) {
      console.error('Failed to fetch processes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (app: string, action: 'start' | 'stop') => {
    try {
      const response = await fetch('/api/processes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app, action }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        alert(error.error);
        return;
      }

      const updatedProcess = await response.json();
      setProcesses(prev => ({
        ...prev,
        [app]: updatedProcess,
      }));
    } catch (error) {
      console.error(`Failed to ${action} ${app}:`, error);
      alert(`Failed to ${action} ${app}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {APPS.map((app) => {
        const process = processes[app];
        const isRunning = process?.status === 'running';

        return (
          <div
            key={app}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h3 className="text-lg font-semibold capitalize mb-2">{app}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${
                isRunning ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-sm text-gray-600">
                {isRunning ? 'Running' : 'Stopped'}
              </span>
            </div>
            {process?.startedAt && (
              <p className="text-sm text-gray-500 mb-4">
                Started: {new Date(process.startedAt).toLocaleString()}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(app, 'start')}
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
                onClick={() => handleAction(app, 'stop')}
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
  );
} 