import winston from 'winston';

import config from 'config';
import DbLoggerWrapper from './dbLoggerWrapper';
import BufferedLogger from './bufferedLogger';

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    info =>
      `[${
        info.timestamp
      }] [${info.level.toUpperCase()}]: ${info.message.trim()}`,
  ),
);

const plainFormat = winston.format.printf(info => info.message.trim());

const HttpCsvLogger = new BufferedLogger(
  winston.createLogger({
    format: plainFormat,
    silent: !config.logging.http.enabled,
    transports: [
      new winston.transports.File({
        filename: config.logging.http.filepath,
      }),
    ],
  }),
  config.logging.http.flushInterval,
);

const DbLogger = new DbLoggerWrapper(
  new BufferedLogger(
    winston.createLogger({
      format,
      silent: !config.logging.db.enabled,
      transports: [
        new winston.transports.File({
          filename: config.logging.db.filepath,
        }),
      ],
    }),
    config.logging.db.flushInterval,
  ),
);

function reloadLoggerConfig() {
  const { http, db } = config.logging;
  HttpCsvLogger.setSilent(!http.enabled);
  HttpCsvLogger.setFlushInterval(http.flushInterval);

  DbLogger.setSilent(!db.enabled);
  DbLogger.setFlushInterval(db.flushInterval);
}

export { HttpCsvLogger, DbLogger, reloadLoggerConfig };
