import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import {
  crateUserValidator,
  createTransactionValidator,
  loginUserValidator,
} from "./src/middlewares/joiValidator.js";

// models
import { auth } from "./src/middlewares/authMiddleware.js";

// middlewares
import { upload } from "./src/middlewares/multerMiddleware.js";

// controllers
import {
  createUser,
  createUserFile,
  loginUser,
} from "./src/controllers/userControllers.js";

import {
  bulkDeleteTransactions,
  createTransaction,
  deleteTransaction,
  getDashboard,
  getTransactions,
} from "./src/controllers/transactionControllers.js";

// inject .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

// cors
app.use(cors());
// parse the request body
app.use(express.json());

// static serve
app.use("/public", express.static("assets"));

// base url
app.get("/", (req, res) => {
  return res.send({
    status: "success",
    message: "Server Running",
  });
});

// User route
// create user
// register
app.post("/api/v1/users", crateUserValidator, createUser);

// get user data
app.get("/api/v1/users", auth, (req, res) => {
  return res.json({
    status: "success",
    message: "user found",
    user: req.user,
  });
});

// create user with file
// api with file upload
app.post("/api/v1/usersfile", upload.single("avatar"), createUserFile);

// login
app.post("/api/v1/login", loginUserValidator, loginUser);

// Transaction Route
// create transactions
app.post(
  "/api/v1/transactions",
  auth,
  createTransactionValidator,
  createTransaction
);

// get transaction
app.get("/api/v1/transactions", auth, getTransactions);

// delete transaction
app.delete("/api/v1/transactions/:id", auth, deleteTransaction);

// bulk delete
app.delete("/api/v1/transactions", auth, bulkDeleteTransactions);

// dashboard get api
// description
// /api/v1/dashboard
// private api - requires authentication
// {status, message, data: {totalAmount, totalIncome, totalExpense} }
app.get("/api/v1/dashboard", auth, getDashboard);

// mongo db connection
mongoose.connect(mongoUrl).then(() => {
  console.log("Connected to ", mongoUrl);
  app.listen(PORT, (error) => {
    if (error) {
      console.log("ERROR WHILE STARTING");
    } else {
      console.log("SERVER STARTED AT PORT : ", PORT);
    }
  });
});
