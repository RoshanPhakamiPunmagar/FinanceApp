import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { findTransactions } from "../models/transactions/TransactionModel.js";
import { auth } from "../middlewares/authMiddleware.js";

dotenv.config();
const router = express.Router();

router.post("/chat", auth, async (req, res) => {
  const { message } = req.body;
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      status: "error",
      message: "Gemini API key not set",
    });
  }

  try {
    const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const transactions = await findTransactions({ userId: req.user._id });
    const contents = [
      {
        role: "system",
        text: "You are a friendly finance assistant. Analyze financial transactions, help users manage budgets, save money, and understand their expenses.",
      },
      {
        role: "user",
        text: `Hello! Please analyze the following transactions and provide insights provide a complete HTML response following this structure:

1. Summary section: total income, total expense, net balance
2. Transactions section: a table with Date, Description, Type, Amount
3. Insights section: list of money-saving tips

        Transactions:
        ${JSON.stringify(transactions, null, 2)}
        Additional request: ${message}`,
      },
    ];

    console.log(111, contents);

    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    res.json({ status: "success", reply: response.text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      status: "error",
      message: "AI failed to respond. Try again later.",
    });
  }
});

export default router;
