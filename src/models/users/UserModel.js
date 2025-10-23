import UserModel from "./UserSchema.js";

// create user in database
export const insertUser = (object) => {
  return UserModel.insertOne(object);
};

// find one user with filter condition
export const findUser = (filter) => {
  return UserModel.findOne(filter);
};

// find users with filter condition
export const findUsers = (filter) => {
  return UserModel.find(filter);
};

// delete users with filter conditions
export const deleteUsers = (filter) => {
  return UserModel.deleteMany(filter);
};

// update user by id
export const updateUserById = (id, updatedData) => {
  return UserModel.findByIdAndUpdate(id, updatedData);
};
