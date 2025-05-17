import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const initPostgres = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tubs (
      id SERIAL PRIMARY KEY,
      encoded_id TEXT UNIQUE NOT NULL,
      name TEXT,
      date_created TIMESTAMPTZ DEFAULT NOW(),
      CONSTRAINT encoded_id_format CHECK ( encoded_id ~ '^[a-zA-Z0-9]{6}$' )
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS requests (
      id SERIAL PRIMARY KEY,
      tub_id INTEGER NOT NULL REFERENCES tubs(id),
      method TEXT NOT NULL,
      headers JSONB,
      body_id TEXT,
      received_at TIMESTAMPTZ DEFAULT NOW(),
      CONSTRAINT fk_tub FOREIGN KEY (tub_id) REFERENCES tubs(id) ON DELETE CASCADE 
    );
  `);

  console.log('Created postgres tables');
};