import winston, { LogEntry } from 'winston';

export default class BufferedLogger {
  private flushInterval: number;

  private logger: winston.Logger;

  private buffer: LogEntry[];

  private flushHandle?: NodeJS.Timer;

  constructor(logger: winston.Logger, flushInterval: number) {
    this.logger = logger;
    this.flushInterval = flushInterval;
    this.buffer = [];
    this.setupFlushHandle();
  }

  private setupFlushHandle() {
    if (this.flushHandle) {
      clearInterval(this.flushHandle);
    }
    this.flushHandle = setInterval(() => {
      this.flush();
    }, 1000 * this.flushInterval);
  }

  private flush() {
    this.buffer.forEach(entry => this.logger.log(entry));
    this.buffer = [];
  }

  setSilent(silent: boolean) {
    this.logger.silent = silent;
  }

  setFlushInterval(flushInterval: number) {
    this.flushInterval = flushInterval;
    this.setupFlushHandle();
  }

  log(entry: LogEntry) {
    this.buffer.push(entry);
  }
}
