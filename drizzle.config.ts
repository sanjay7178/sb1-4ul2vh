import type { Config } from 'drizzle-kit';

// Drizzle configuration
const config: Config = {
  schema: './src/db/schema.ts', // Path to your schema file
  out: './drizzle', // Directory to output migrations
  driver: 'pg', // PostgreSQL as the database driver
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!, // PostgreSQL connection string from environment variables
  },
};

export default config;
