import { pgTable, text, serial, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const transactionCategories = [
  "Housing",
  "Utilities",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Subscriptions",
  "Entertainment",
  "Health & Wellness",
  "Clothing",
  "Education",
  "Savings & Investments",
  "Personal Care",
  "Gifts",
  "Travel",
  "Miscellaneous"
] as const;

export const transactionTypes = ["expense", "income", "investment"] as const;
export const accountTypes = ["chequing", "credit"] as const;

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: transactionTypes }).notNull(),
  category: text("category", { enum: transactionCategories }).notNull(),
  accountType: text("account_type", { enum: accountTypes }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
});

export const insertTransactionSchema = createInsertSchema(transactions)
  .omit({ id: true })
  .extend({
    amount: z.number().positive(),
    date: z.coerce.date(),
  });

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;