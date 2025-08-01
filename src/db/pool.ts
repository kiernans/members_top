import { Pool } from 'pg';

// Needed for accessing psql database
// Used in query.ts

export default new Pool({
  host: 'localhost',
  user: 'nukabunny',
  database: 'top_members',
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});
