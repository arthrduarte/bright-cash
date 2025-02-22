import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
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

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type", { enum: transactionTypes }).notNull(),
  category: text("category", { enum: transactionCategories }).notNull(),
  accountType: text("account_type", { enum: accountTypes }).notNull(),
  amount: real("amount").notNull(),
  description: text("description").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
});

export const insertTransactionSchema = createInsertSchema(transactions)
  .omit({ id: true })
  .extend({
    amount: z.number().positive(),
    date: z.coerce.date(),
  });

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;