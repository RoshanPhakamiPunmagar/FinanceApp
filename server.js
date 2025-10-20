import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import {
  createUserValidator,
  loginUserValidator,
  createTransactionValidator,
} from "./src/middlewares/joiValidator.js";

import { auth } from "./src/middlewares/authMiddleware.js";
import { createUser, loginUser } from "./src/controllers/userController.js";
import {
  createTransaction,
  getAllTransactions,
} from "./src/controllers/transactionController.js";
const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
//parse the request body
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  return res.send({
    status: "success",
    message: "Server running",
  });
});

//register user in db
app.post("/api/v1/users", createUserValidator, createUser);

//login
app.post("/api/v1/login", loginUserValidator, loginUser);

//create new Transaction
app.post(
  "/api/v1/transactions",
  auth,
  createTransactionValidator,
  createTransaction
);

app.get("/api/v1/transactions", auth, getAllTransactions);

//mongoose database connection mongodb://localhost:27017/auth-db
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongodb://localhost:27017/Finance");
  app.listen(PORT, (error) => {
    if (error) {
      console.log("Error while starting");
    } else {
      console.log(`Server started at port ${PORT}`);
    }
  });
});
