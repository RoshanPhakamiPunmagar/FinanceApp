import bcrypt from "bcrypt";

export const encryptText = (plainText) => {
  const salt = bcrypt.genSaltSync(10);

  //encrypt password
  let encryptedText = bcrypt.hashSync(plainText, salt);
  return encryptedText;
};

//compare passwords are same or not
export const compareText = (plainText, encryptedText) => {
  return bcrypt.compareSync(plainText, encryptedText);
};
