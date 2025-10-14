import { insertTransaction } from "../models/transaction/transactionModel.js";

export const createTransaction = async (req, res) => {
  try {
    let transactionObject = req.body;
    transactionObject.userid = req.user._id;

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
