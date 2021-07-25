type LogLevel = 'info' | 'success' | 'trace' | 'warn' | 'error' | 'fatal' | 'debug';
type LogMethod = 'trace' | 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  private levels: Record<LogLevel, LogMethod>;

  constructor() {
    this.levels = {
      info: 'info',
      success: 'info',
      trace: 'trace',
      warn: 'warn',
      error: 'trace',
      fatal: 'trace',
      debug: 'debug',
    };
  }

  info(...contents: readonly unknown[]): void {
    this.write('info', ...contents);
  }

  success(...contents: readonly unknown[]): void {
    this.write('success', ...contents);
  }

  trace(...contents: readonly unknown[]): void {
    this.write('trace', ...contents);
  }

  warn(...contents: readonly unknown[]): void {
    this.write('warn', ...contents);
  }

  error(...contents: readonly unknown[]): void {
    this.write('error', ...contents);
  }

  fatal(...contents: readonly unknown[]): void {
    this.write('fatal', ...contents);
  }

  debug(...contents: readonly unknown[]): void {
    this.write('debug', ...contents);
  }

  write(level: LogLevel, ...contents: readonly unknown[]): void {
    const method = this.levels[level];
    // eslint-disable-next-line no-console
    console[method](`${new Date().toISOString()} - ${contents.join('\n')}`);
  }
}
