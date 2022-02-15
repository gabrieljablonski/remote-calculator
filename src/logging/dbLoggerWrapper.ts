/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger, QueryRunner } from 'typeorm';

import BufferedLogger from './bufferedLogger';

export default class DbLoggerWrapper implements Logger {
  private logger;

  constructor(logger: BufferedLogger) {
    this.logger = logger;
  }

  setSilent(silent: boolean) {
    this.logger.setSilent(silent);
  }

  setFlushInterval(flushInterval: number) {
    this.logger.setFlushInterval(flushInterval);
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: string,
    queryRunner?: QueryRunner,
  ) {
    this.logger.log({ level, message });
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.log({ level: 'info', message });
  }

  logQuery(query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    this.logger.log({ level: 'info', message: query });
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: unknown[],
    queryRunner?: QueryRunner,
  ) {
    this.logger.log({ level: 'error', message: `${query}: ${error}` });
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: unknown[],
    queryRunner?: QueryRunner,
  ) {
    this.logger.log({ level: 'warn', message: `${query}: took ${time}` });
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.logger.log({ level: 'info', message });
  }
}
