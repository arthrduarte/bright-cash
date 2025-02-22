import { Transaction, InsertTransaction } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  getTransactions(): Promise<Transaction[]>;
  getTransactionsByMonth(month: number, year: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, transaction: InsertTransaction): Promise<Transaction>;
  deleteTransaction(id: number): Promise<void>;
  getExpensesByCategory(month: number, year: number): Promise<{ category: string; total: number }[]>;
}

export class DatabaseStorage implements IStorage {
  async getTransactions(): Promise<Transaction[]> {
    const stmt = db.prepare(`SELECT id, type, category, account_type as accountType, amount, description, date FROM transactions`);
    const rows = stmt.all() as Transaction[];
    return rows.map(row => ({
      ...row,
      date: new Date(row.date)
    }));
  }

  async getTransactionsByMonth(month: number, year: number): Promise<Transaction[]> {
    const stmt = db.prepare(`
      SELECT 
        id, 
        type, 
        category, 
        account_type as accountType, 
        amount, 
        description, 
        date
      FROM transactions
      WHERE 
        strftime('%m', datetime(date/1000, 'unixepoch')) = @month
        AND strftime('%Y', datetime(date/1000, 'unixepoch')) = @year
    `);
    
    const rows = stmt.all({
      month: month.toString().padStart(2, '0'),
      year: year.toString()
    }) as Transaction[];
    
    return rows.map(row => ({
      ...row,
      date: new Date(row.date)
    }));
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const stmt = db.prepare(`
      INSERT INTO transactions (type, category, account_type, amount, description, date)
      VALUES (@type, @category, @accountType, @amount, @description, @date)
      RETURNING id, type, category, account_type as accountType, amount, description, date
    `);
    
    const result = stmt.get({
      ...transaction,
      date: transaction.date.getTime()
    }) as Transaction;
    
    return {
      ...result,
      date: new Date(result.date)
    };
  }

  async updateTransaction(id: number, transaction: InsertTransaction): Promise<Transaction> {
    const stmt = db.prepare(`
      UPDATE transactions 
      SET type = @type,
          category = @category,
          account_type = @accountType,
          amount = @amount,
          description = @description,
          date = @date
      WHERE id = @id
      RETURNING id, type, category, account_type as accountType, amount, description, date
    `);
    
    const result = stmt.get({
      ...transaction,
      id,
      date: transaction.date.getTime()
    }) as Transaction;
    
    return {
      ...result,
      date: new Date(result.date)
    };
  }

  async deleteTransaction(id: number): Promise<void> {
    const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
    stmt.run(id);
  }

  async getExpensesByCategory(month: number, year: number): Promise<{ category: string; total: number }[]> {
    const stmt = db.prepare(`
      SELECT 
        category,
        SUM(amount) as total
      FROM transactions
      WHERE 
        type = 'expense'
        AND strftime('%m', datetime(date/1000, 'unixepoch')) = @month
        AND strftime('%Y', datetime(date/1000, 'unixepoch')) = @year
        AND category IS NOT NULL
      GROUP BY category
      ORDER BY total DESC
    `);
    
    return stmt.all({
      month: month.toString().padStart(2, '0'),
      year: year.toString()
    }) as { category: string; total: number }[];
  }
}

export const storage = new DatabaseStorage();