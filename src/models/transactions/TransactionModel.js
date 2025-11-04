import TransactionModel from "./TransactionSchema.js";

// create transaction in database
export const insertTransaction = (object) => {
  return TransactionModel.insertOne(object);
};

// find one transaction with filter condition
export const findTransaction = (filter) => {
  return TransactionModel.findOne(filter);
};

// find transactions with filter condition
export const findTransactions = async (filter, options) => {
  const query = TransactionModel.find(filter);
  if (options?.skip) {
    query.skip(options.skip);
  }

  if (options?.pageLimit) {
    query.limit(options.pageLimit);
  }
  return await query.exec();
};

// delete transactions with filter conditions
export const removeTransactions = (filter) => {
  // { _id: id}
  // {_id : {$in: [id1, id2]}}
  return TransactionModel.deleteMany(filter);
};

// update user by id
export const updateTransactionById = (id, updatedData) => {
  return TransactionModel.findByIdAndUpdate(id, updatedData);
};
