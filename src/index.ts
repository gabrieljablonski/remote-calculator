import config from 'config';
import { createConnection } from 'typeorm';
import createServer from 'utils/createServer';

createConnection().then(() => {
  const server = createServer();
  server.listen(config.httpPort, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${config.httpPort}!`);
  });
});
