import { findUser } from "../models/users/UserModel.js";
import { verifyToken } from "../utils/helpers.js";

export const auth = async (req, res, next) => {
  try {
    // lets get the request authorization token
    let token = req.headers.authorization;

    // decode token and verify
    let decodedData = verifyToken(token);
    let user = await findUser({ email: decodedData.email, token: token });

    if (user) {
      req.user = user;
      req.user.password = "";
      next();
    } else {
      return res.send({
        status: "error",
        message: "User not authenticated!",
      });
    }
  } catch (error) {
    return res.send({
      status: "error",
      message: "User not authenticated",
    });
  }
};
