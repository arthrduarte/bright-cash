import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertTransactionSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/transactions", async (_req, res) => {
    const transactions = await storage.getTransactions();
    res.json(transactions);
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