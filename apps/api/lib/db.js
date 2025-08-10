import { getDb, schema } from '@opensource-startup-crm/database';

export const db = getDb({
  DATABASE_URL: process.env.DATABASE_URL,
  DEV_DATABASE_URL: process.env.DEV_DATABASE_URL,
  ENV_TYPE: process.env.ENV_TYPE,
  HYPERDRIVE: process.env.HYPERDRIVE
});

export { schema };


