import {
  findUser,
  insertUser,
  updateUserById,
} from "../models/users/UserModel.js";
import { sendMail } from "../utils/emailHelpers.js";
import { compareText, encryptText, signToken } from "../utils/helpers.js";

export const createUser = async (req, res) => {
  try {
    // get the request data
    let userObject = req.body;

    // encrypt the password
    userObject.password = encryptText(userObject.password);

    // get user User Model
    // insertUser(userObject)
    let user = await insertUser(userObject);

    // email the new user with sign up email
    // Create a test account or replace with real credentials.

    sendMail(
      userObject.email,
      "Welcome to Financial Tracker",
      `<div style="max-width:600px; margin:40px auto; background-color:#ffffff; padding:30px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    
    <h1 style="color:#333333; font-size:24px; margin-bottom:20px;">Welcome to Our Community!</h1>
    
    <p style="color:#555555; font-size:16px; line-height:1.6; margin:0 0 20px;">
      Hi [First Name],
    </p>
    
    <p style="color:#555555; font-size:16px; line-height:1.6; margin:0 0 20px;">
      We're excited to have you on board. Get ready to explore, learn, and connect. If you ever need help, we’re just a click away.
    </p>
    
    <a href="https://yourwebsite.com/login" style="display:inline-block; background-color:#007BFF; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:4px; font-size:16px;">
      Get Started
    </a>

    <p style="color:#999999; font-size:12px; line-height:1.5; margin-top:30px;">
      If you didn’t sign up for this account, you can safely ignore this email.
    </p>

  </div>`
    );

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

export const createUserFile = async (req, res) => {
  try {
    // get the request data
    let userObject = req.body;

    // encrypt the password
    userObject.password = encryptText(userObject.password);

    // get user User Model
    // insertUser(userObject)
    // req.file
    userObject.image = "http://localhost:3000/public/" + req.file.filename;

    let user = await insertUser(userObject);

    // email the new user with sign up email
    // Create a test account or replace with real credentials.

    sendMail(
      userObject.email,
      "Welcome to Financial Tracker",
      `<div style="max-width:600px; margin:40px auto; background-color:#ffffff; padding:30px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    
    <h1 style="color:#333333; font-size:24px; margin-bottom:20px;">Welcome to Our Community!</h1>
    
    <p style="color:#555555; font-size:16px; line-height:1.6; margin:0 0 20px;">
      Hi [First Name],
    </p>
    
    <p style="color:#555555; font-size:16px; line-height:1.6; margin:0 0 20px;">
      We're excited to have you on board. Get ready to explore, learn, and connect. If you ever need help, we’re just a click away.
    </p>
    
    <a href="https://yourwebsite.com/login" style="display:inline-block; background-color:#007BFF; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:4px; font-size:16px;">
      Get Started
    </a>

    <p style="color:#999999; font-size:12px; line-height:1.5; margin-top:30px;">
      If you didn’t sign up for this account, you can safely ignore this email.
    </p>

  </div>`
    );

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
    // 1. get email and password from client
    let { email, password } = req.body;

    // 2. verify if we have the user with email
    let user = await findUser({ email });

    if (user) {
      // if user is available
      let compare = compareText(password, user.password);

      if (compare) {
        // successful login

        // create a token
        // signToken({email})
        const token = signToken({ email: user.email });

        let update = await updateUserById(user._id, {
          token,
        });

        // let update = await User.findByIdAndUpdate(user._id, { token: token });
        // reset user password
        user.password = "";
        return res.send({
          status: "success",
          message: "User Login Successful",
          token,
          user,
        });
      } else {
        return res.send({
          status: "error",
          message: "Invalid Email or Password",
        });
      }
    } else {
      return res.send({
        status: "error",
        message: "User not found!",
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return res.send({
      status: "error",
      message: error.message,
    });
  }
};
