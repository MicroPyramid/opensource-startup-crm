import _schema from "./schema";
import { drizzle as drizzlePostgres, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon, type NeonHttpDatabase } from 'drizzle-orm/neon-http';

export const schema = _schema;

export type DrizzleClient = PostgresJsDatabase<typeof _schema> | NeonHttpDatabase<typeof _schema>;

export const getDb = <TEnv extends {
  ENV_TYPE?: string;
  DEV_DATABASE_URL?: string;
  HYPERDRIVE?: any;
  DATABASE_URL?: string
}>(env: TEnv): DrizzleClient => {
  const databaseUrl = env?.DEV_DATABASE_URL || env.DATABASE_URL || env.HYPERDRIVE?.connectionString;

  if (!databaseUrl) throw new Error("DEV_DATABASE_URL, DATABASE_URL or HYPERDRIVE is not set");

  try {
    if (env?.DEV_DATABASE_URL || env?.ENV_TYPE === 'dev') {
      console.log("Using postgres client for local development");
      return drizzlePostgres(databaseUrl, { schema: _schema });
    }

    return drizzleNeon({ client: neon(databaseUrl), schema: _schema });
  } catch (error) {
    console.error("Failed to initialize database client:", error);
    throw error;
  }
};