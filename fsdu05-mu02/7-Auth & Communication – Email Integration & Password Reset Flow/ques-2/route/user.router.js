const express =require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../model/user.model");
const UserRouter=express.Router();
const { sendResetEmail } = require('../utils/mailer');
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

UserRouter.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_RESET_SECRET, { expiresIn: '15m' });
      await sendResetEmail(email, token);
    }
    res.send('If that email is registered, a reset link has been sent.');
  } catch (err) {
    res.status(500).send('Failed to process');
  }
});

UserRouter.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    const hashed = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(decoded.id, { password: hashed });
    res.send('Password reset successful');
  } catch (err) {
    res.status(400).send('Invalid or expired token');
  }
});

module.exports=UserRouter;