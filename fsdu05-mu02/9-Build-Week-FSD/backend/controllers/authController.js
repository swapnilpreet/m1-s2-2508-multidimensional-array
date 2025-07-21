import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utills/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const userEmail = req.body.email;
  const submittedPassword = req.body.password;
  const foundUser = await User.findOne({ email: userEmail });
  if (!foundUser) {
    res.status(404);
    throw new Error("User not Found with this emailID");
  }
  if (foundUser && (await foundUser.matchPassword(submittedPassword))) {
    const responsePayload = {
      message: "User authenticated successfully!",
      data: {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        isAdmin: foundUser.isAdmin,
      },
      token: generateToken(foundUser._id),
    };
    res.status(200).json(responsePayload);
  } else {
    res.status(401);
    throw new Error(
      "Invalid email or password. Please check your credentials and try again."
    );
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const existingUser = await User.findOne({ email: userEmail });

  if (existingUser) {
    res.status(400);
    throw new Error(
      "A user with this email address already exists. Please try logging in or use a different email."
    );
  }
  const newUser = await User.create({
    name: userName,
    email: userEmail,
    password: userPassword,
  });
  if (newUser) {
    const responsePayload = {
      message: "User registered successfully!",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      token: generateToken(newUser._id),
    };
    res.status(201).json(responsePayload);
  } else {
    res.status(400);
    throw new Error(
      "Invalid user data provided. Please check your input and try again."
    );
  }
});

const changepassword = asyncHandler(async (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Please provide both old and new passwords.");
  }
  const user = await User.findById(req.user._id);
  if (user && (await user.matchPassword(oldPassword))) {
    user.password = newPassword;
    const updatedUser = await user.save();
    res.status(200).json({
      message: "Password updated successfully!",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } else if (!user) {
    res.status(404);
    throw new Error("User not found.");
  } else {
    res.status(401);
    throw new Error("Invalid old password. Please try again.");
  }
});

export { authUser, registerUser, changepassword };
