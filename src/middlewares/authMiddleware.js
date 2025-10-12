import jwt from "jsonwebtoken";
import { findUser } from "../models/users/UserModel.js";

export const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    let decodedData = jwt.verify(token, "secret-key");

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
