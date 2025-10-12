import jwt from "jsonwebtoken";

import {
  findUser,
  insertUser,
  updateUserById,
} from "../models/users/userModel.js";

import { compareText, encryptText } from "../utils/helper.js";

export const createUser = async (req, res) => {
  try {
    let userObject = req.body;

    userObject.password = encryptText(userObject.password);

    let newUser = await insertUser(userObject);

    return res.send({
      status: "success",
      message: "User Created",
    });
  } catch (error) {
    console.log(error.message);
    return res.send({
      status: "error",
      from: "creating",
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await findUser({ email });
    if (user) {
      let compare = compareText(password, user.password);

      if (compare) {
        const token = jwt.sign(
          {
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRE,
          }
        );

        let updatedUser = await updateUserById(user._id, token);

        return res.send({
          status: "success",
          message: " user login successful",
          token,
        });
      } else {
        return res.send(401)({
          status: "error",
          message: "Invalid email or password",
        });
      }
    } else {
      return res.send(404)({
        status: "error",
        message: "User not  found",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.send({
      status: "error",
      message: error.message,
    });
  }
};
