export interface ProcessInfo {
  pid: number;
  app: string;
  status: 'running' | 'stopped';
  startedAt: string;
}

export interface ProcessState {
  processes: Record<string, ProcessInfo>;
} 