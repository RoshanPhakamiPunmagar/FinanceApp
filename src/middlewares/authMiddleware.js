import jwt from "jsonwebtoken";
import { findUser } from "../models/users/userModel.js";

export const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    console.log(token);
    let decodedData = jwt.verify(token, process.env.JWT_SECRET);

    let user = await findUser({ email: decodedData.email, token: token });

    if (user) {
      req.user = user;
      next();
    } else {
      return res.send({
        status: "error",
        message: "User not authenticated",
      });
    }
  } catch (error) {
    return res.send({
      status: "error",
      message: "User not authenticated",
    });
  }
};
