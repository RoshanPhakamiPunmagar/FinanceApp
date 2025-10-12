import UserModel from "./userSchema.js";

//create user in database
export const insertUser = (object) => {
  return UserModel.insertOne(object);
};

//find user with filter condition

export const findUser = (filter) => {
  return UserModel.findOne(filter);
};

//find users with multiple conditions
export const findUsers = (filter) => {
  return UserModel.find(filter);
};

//delete users
export const deleteUsers = (filter) => {
  return UserModel.deleteMany(filter);
};

//update user using id
export const updateUserById = (id, updatedData) => {
  return UserModel.findByIdAndUpdate(id, updatedData);
};
