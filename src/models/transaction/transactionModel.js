import Transaction from "./transactionSchema.js";

export const insertTransaction = (transaction) => {
  return Transaction.create(transaction);
};

export const findTransaction = (filter) => {
  return Transaction.findOne(filter);
};

export const findTransactions = (filter) => {
  return Transaction.find(filter);
};

export const updateTransactionById = (id, updatedData) => {
  return Transaction.findByIdAndUpdate(id, updatedData);
};

export const deleteTransactionById = (id) => {
  return Transaction.findByIdAndDelete(id);
};

export const deleteTransactionsByUser = (userId) => {
  return Transaction.deleteMany(userId);
};
