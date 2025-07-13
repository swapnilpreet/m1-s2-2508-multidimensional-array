const express = require("express");
const AuthRouter = express.Router();
const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

AuthRouter.post("/register", async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ msg: "Please enter username, email, and password" });
  }

  try {
    let userByUsername = await UserModel.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ msg: "Username already exists" });
    }
    let userByEmail = await UserModel.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const newUser = new UserModel({ username, email, password, role, profile });
    const salt = await bcrypt.genSalt(5);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    res.status(200).json({message:"signup success",user:newUser})
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields"});
  }
  try {
    const user = await UserModel.findOne({email});
    if (!user) {
      return res.status(400).json({ msg: "Invalid Email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({ msg: "Invalid password" });
    }
    
    const payload ={user:{id:user.id}};
    const token=await jwt.sign(payload,process.env.JWT_SECRET);
    res.status(200).json({message:"Login sucess",token})
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = AuthRouter;
