const express =require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../model/user.model");
const UserRouter=express.Router();
require('dotenv').config();

UserRouter.post('/signup',async(req,res)=>{
  const { name, email, password } = req.body;
  try {
    const existing = await UserModel.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Signup success" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
})

UserRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});



module.exports=UserRouter;