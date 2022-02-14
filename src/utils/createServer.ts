import express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';

import routes from 'http/routes';

export default function createServer() {
  const app = express();
  const server = http.createServer(app);

  app.use(bodyParser.json());
  app.use('/v1', routes);

  return server;
}
