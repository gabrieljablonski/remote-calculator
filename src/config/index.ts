import * as dotenv from 'dotenv';

interface LoggerOptions {
  enabled: boolean;
  filepath: string;
  flushInterval: number;
}

dotenv.config();

// eslint-disable-next-line import/no-mutable-exports
let config = {} as {
  env: string;
  httpPort: number;
  logging: {
    http: LoggerOptions;
    db: LoggerOptions;
  };
};

function reloadConfig() {
  dotenv.config({
    override: true,
  });
  config = {
    env: process.env.NODE_ENV ?? 'development',
    httpPort: Number(process.env.REMOTE_CALCULATOR_HTTP_PORT) || 6160,
    logging: {
      http: {
        enabled: process.env.REMOTE_CALCULATOR_HTTP_LOG_ENABLED === 'true',
        filepath:
          process.env.REMOTE_CALCULATOR_HTTP_LOG_FILE ||
          'logs/remote-calculator-http.log',
        flushInterval:
          Number(process.env.REMOTE_CALCULATOR_HTTP_LOG_FLUSH_INTERVAL) || 10, // in seconds
      },
      db: {
        enabled: process.env.REMOTE_CALCULATOR_DB_LOG_ENABLED === 'true',
        filepath:
          process.env.REMOTE_CALCULATOR_DB_LOG_FILE ||
          'logs/remote-calculator-db.log',
        flushInterval:
          Number(process.env.REMOTE_CALCULATOR_DB_LOG_FLUSH_INTERVAL) || 10, // in seconds
      },
    },
  };
}

reloadConfig();

export { reloadConfig };
// eslint-disable-next-line no-restricted-exports
export { config as default };
