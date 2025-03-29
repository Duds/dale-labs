export interface ProcessInfo {
  pid: number;
  app: string;
  status: 'running' | 'stopped';
  startedAt: string;
  port: number;
}

export interface ProcessState {
  processes: Record<string, ProcessInfo>;
} 