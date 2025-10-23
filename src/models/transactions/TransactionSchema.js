import mongoose from "mongoose";

// TODO: split schema and query functions
const TrasactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Transaction = mongoose.model("Transaction", TrasactionSchema);

export default Transaction;
