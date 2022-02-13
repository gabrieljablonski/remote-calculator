import express from 'express';
import { createConnection } from 'typeorm';
import * as http from 'http';
import * as bodyParser from 'body-parser';

import config from './config';
import routes from './http/routes';

createConnection()
  .then(async () => {
    const app = express();
    const server = http.createServer(app);

    app.use(bodyParser.json());

    app.use('/v1', routes);

    server.listen(config.httpPort, '0.0.0.0', () => {
      // eslint-disable-next-line no-console
      console.log(`Server started on port ${config.httpPort}!`);
    });
  })
  // eslint-disable-next-line no-console
  .catch(error => console.log(error));
