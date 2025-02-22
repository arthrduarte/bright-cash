import { Transaction, InsertTransaction } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  getTransactions(): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, transaction: InsertTransaction): Promise<Transaction>;
  deleteTransaction(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getTransactions(): Promise<Transaction[]> {
    const stmt = db.prepare(`SELECT * FROM transactions`);
    const rows = stmt.all() as Transaction[];
    return rows.map(row => ({
      ...row,
      date: new Date(row.date)
    }));
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const stmt = db.prepare(`
      INSERT INTO transactions (type, category, account_type, amount, description, date)
      VALUES (@type, @category, @accountType, @amount, @description, @date)
      RETURNING *
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
      RETURNING *
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
}

export const storage = new DatabaseStorage();