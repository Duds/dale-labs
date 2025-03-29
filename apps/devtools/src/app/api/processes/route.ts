import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { ProcessState, ProcessInfo } from '@/types/process';

const PROCESSES_FILE = path.join(process.cwd(), 'processes.json');

async function readProcessesFile(): Promise<ProcessState> {
  try {
    const data = await fs.readFile(PROCESSES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { processes: {} };
  }
}

async function writeProcessesFile(state: ProcessState) {
  await fs.writeFile(PROCESSES_FILE, JSON.stringify(state, null, 2));
}

export async function GET() {
  const state = await readProcessesFile();
  return NextResponse.json(state);
}

export async function POST(request: Request) {
  const { app, action } = await request.json();
  const state = await readProcessesFile();
  
  if (action === 'start') {
    if (state.processes[app]?.status === 'running') {
      return NextResponse.json({ error: 'App is already running' }, { status: 400 });
    }

    const process = spawn('pnpm', ['dev', '--filter', app], {
      stdio: 'pipe',
      shell: true
    });

    const processInfo: ProcessInfo = {
      pid: process.pid!,
      app,
      status: 'running',
      startedAt: new Date().toISOString()
    };

    state.processes[app] = processInfo;
    await writeProcessesFile(state);

    return NextResponse.json(processInfo);
  } else if (action === 'stop') {
    const processInfo = state.processes[app];
    if (!processInfo || processInfo.status === 'stopped') {
      return NextResponse.json({ error: 'App is not running' }, { status: 400 });
    }

    try {
      process.kill(processInfo.pid);
      processInfo.status = 'stopped';
      await writeProcessesFile(state);
      return NextResponse.json(processInfo);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to stop process' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
} 