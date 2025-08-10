import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
config()

// Use DEV_DATABASE_URL for local Supabase, fallback to DATABASE_URL
const databaseUrl = process.env.DEV_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) throw new Error('DEV_DATABASE_URL or DATABASE_URL is not set');

export default defineConfig({
	schema: './src/schema',
	out: './migrations',
	dbCredentials: {
		url: databaseUrl
	},
	verbose: true,
	strict: true,
	dialect: 'postgresql'
});