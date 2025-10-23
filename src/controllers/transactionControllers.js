import {
  findTransactions,
  insertTransaction,
  removeTransactions,
} from "../models/transactions/TransactionModel.js";

export const createTransaction = async (req, res) => {
  try {
    // {date, amount, description}
    let transactionObject = req.body;

    //update userid
    transactionObject.userId = req.user._id;
    let transaction = await insertTransaction(transactionObject);

    return res.send({
      status: "success",
      message: "Transaction Created Successfully",
      transaction,
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    let { page } = req.query;
    let { max } = req.query;
    console.log("PAGE NO:", page);

    let pageLimit = req.query.pageLimit || 5;
    let skip = ((page || 1) - 1) * pageLimit;
    console.log("skip", skip);

    // lets get the request authorization token
    // TODO: convert to transaction query function
    let filterCondition = { userId: req.user._id };

    // extra filter condition
    if (max) {
      filterCondition.amount = { $lte: max };
    }

    let transactions = await findTransactions(filterCondition, {
      skip,
      pageLimit,
    });

    return res.send({
      status: "success",
      message: "Transaction Found!",
      transactions,
    });
  } catch (error) {
    return res.send({ status: "error", message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await removeTransactions({ _id: id });

    return res.send({
      status: "success",
      message: "Transaction Deleted!",
      transactions,
    });
  } catch (error) {
    return res.send({ status: "error", message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const transactions = await findTransactions({ userId: req.user._id });

    const balance = transactions.reduce((acc, item) => acc + item.amount, 0);
    const income = transactions.reduce((acc, item) => {
      return item.type === "income" ? acc + item.amount : acc;
    }, 0);

    const expense = transactions.reduce((acc, item) => {
      return item.type === "expense" ? acc + item.amount : acc;
    }, 0);

    return res.json({
      status: "success",
      message: "Dashboard data found!",
      data: {
        balance,
        income,
        expense,
      },
    });
  } catch (error) {
    return res.send({ status: "error", message: error.message });
  }
};
