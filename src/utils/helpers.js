import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const encryptText = (plaintext) => {
  const salt = bcrypt.genSaltSync(10);

  // encrypt the password
  let encryptedText = bcrypt.hashSync(plaintext, salt);
  return encryptedText;
};

export const compareText = (plaintext, encryptedText) => {
  return bcrypt.compareSync(plaintext, encryptedText);
};

// sign token
export const signToken = (payload) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "1d",
  });
};

// verify Token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
