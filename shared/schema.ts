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

export const transactionSchema = z.object({
  id: z.number().optional(),
  type: z.enum(transactionTypes),
  category: z.enum(transactionCategories).optional(),
  accountType: z.enum(accountTypes),
  amount: z.number().positive(),
  description: z.string(),
  date: z.coerce.date()
});

// Create a refined schema that requires category only for expense type
export const insertTransactionSchema = transactionSchema.omit({ id: true }).superRefine((data, ctx) => {
  if (data.type === "expense" && !data.category) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Category is required for expense transactions",
      path: ["category"],
    });
  }
});

export type Transaction = z.infer<typeof transactionSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;