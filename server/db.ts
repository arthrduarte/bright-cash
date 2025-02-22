import Database from "better-sqlite3";

// Create the database file if it doesn't exist
const db = new Database("sqlite.db");

// Create tables
db.exec(`CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL CHECK (type IN ('expense', 'income', 'investment')),
  category TEXT CHECK (category IN ('Housing', 'Utilities', 'Groceries', 'Dining Out', 'Transportation', 'Subscriptions', 'Entertainment', 'Health & Wellness', 'Clothing', 'Education', 'Savings & Investments', 'Personal Care', 'Gifts', 'Travel', 'Miscellaneous')),
  account_type TEXT NOT NULL CHECK (account_type IN ('chequing', 'credit')),
  amount REAL NOT NULL CHECK (amount > 0),
  description TEXT NOT NULL,
  date INTEGER NOT NULL
)`);

export { db };