import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertTransactionSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/transactions", async (req, res) => {
    const month = req.query.month ? parseInt(req.query.month as string) : undefined;
    const year = req.query.year ? parseInt(req.query.year as string) : undefined;

    try {
      if (month !== undefined && year !== undefined) {
        const transactions = await storage.getTransactionsByMonth(month, year);
        res.json(transactions);
      } else {
        const transactions = await storage.getTransactions();
        res.json(transactions);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    const result = insertTransactionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const transaction = await storage.createTransaction(result.data);
    res.json(transaction);
  });

  app.put("/api/transactions/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const result = insertTransactionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const transaction = await storage.updateTransaction(id, result.data);
    res.json(transaction);
  });

  app.delete("/api/transactions/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    await storage.deleteTransaction(id);
    res.status(204).send();
  });

  return createServer(app);
}