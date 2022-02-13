import express from 'express';
import * as http from 'http';
import { createConnection } from 'typeorm';

import routes from './routes';
import config from './config';

createConnection()
  .then(async () => {
    const app = express();
    const server = http.createServer(app);

    app.use('/v1', routes);

    server.listen(config.httpPort, '0.0.0.0', () => {
      // eslint-disable-next-line no-console
      console.log(`Server started on port ${config.httpPort}!`);
    });
  })
  // eslint-disable-next-line no-console
  .catch(error => console.log(error));
