import { createConnection } from 'typeorm';

import config from 'config';
import createServer from 'http/createServer';

createConnection()
  .then(() => {
    const server = createServer();
    server.listen(config.httpPort, () => {
      // eslint-disable-next-line no-console
      console.log(`Server started on port ${config.httpPort}!`);
    });
  })
  .catch(error => console.log(error));
