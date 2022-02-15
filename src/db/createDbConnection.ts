import { createConnection, getConnectionOptions } from 'typeorm';

import { DbLogger } from 'logging';

export default async function createDbConnection() {
  const options = await getConnectionOptions();
  return createConnection({
    ...options,
    logger: DbLogger,
  });
}
