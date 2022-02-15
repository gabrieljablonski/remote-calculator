import morgan from 'morgan';

import { HttpCsvLogger } from 'logging';

const logRequests = morgan(
  ':remote-addr,:method :url,:status,:res[Remote-Calculator-Calculation-Id],:response-time',
  {
    stream: {
      write: message => HttpCsvLogger.log({ level: 'info', message }),
    },
  },
);

export default logRequests;
