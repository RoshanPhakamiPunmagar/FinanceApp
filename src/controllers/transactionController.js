import {
  findTransactions,
  insertTransaction,
} from "../models/transaction/transactionModel.js";

export const createTransaction = async (req, res) => {
  try {
    let transactionObject = req.body;
    transactionObject.userId = req.user._id;

    const transaction = await insertTransaction(transactionObject);

    return res.send({
      status: "success",
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

//get transactions
export const getAllTransactions = async (req, res) => {
  try {
    let { page } = req.query;
    let { max } = req.query;

    let pageLimit = req.query.pageLimit || 5;

    let skip = ((page || 1) - 1) * pageLimit;

    let filteredCondition = { userId: req.user._id };

    if (max) {
      filteredCondition.amount = { $lte: max };
    }

    let transactions = await findTransactions(filteredCondition)
      .skip(skip)
      .limit(pageLimit);

    // Send a successful response with the retrieved transactions
    return res.send({
      status: "success",
      message: "Transactions found!",
      transactions,
    });
  } catch (error) {
    // Handle any errors that occur during execution
    return res.send({
      status: "error",
      message: error.message,
    });
  }
};

//delete transaction
