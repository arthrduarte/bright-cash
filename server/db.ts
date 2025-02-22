import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

// Create the database file if it doesn't exist
const sqlite = new Database("sqlite.db");

// Create tables
const db = drizzle(sqlite, { schema });

// Initialize the database with schema
db.run(`CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  category TEXT,
  account_type TEXT NOT NULL,
  amount REAL NOT NULL,
  description TEXT NOT NULL,
  date INTEGER NOT NULL
)`);

export { db };