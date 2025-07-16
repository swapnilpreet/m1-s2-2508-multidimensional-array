const express=require('express');
const UserModel = require('../models/user.model');
const bcrypt =require('bcrypt');
const UserRouter=express.Router();
const jwt=require('jsonwebtoken');
const { sendResetEmail } = require('../utills/mailer');
require('dotenv').config();

UserRouter.post("/signup",async(req,res)=>{
    try {
        const {email,password,role}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
           return res.status(400).json({message:"user alredy register"})
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new UserModel({email, password: hashedPassword ,role});
        await newUser.save();
        res.status(200).json({message:"User Created"})
    } catch (error) {
        res.status(400).json({message:"Error occured in register",error})
    }
    
})
UserRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({ token });
    } catch (error) {
        res.status(400).json({message:"Error occured in login",error})
    }
})

UserRouter.post('/forgot-password',async(req,res)=>{
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

UserRouter.post("/reset-password/:token",async(req,res)=>{
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
        const hashed = await bcrypt.hash(newPassword, 10);
    
        await UserModel.findByIdAndUpdate(decoded.id, { password: hashed });
        res.send('Password reset successful');
    } catch (err) {
        console.log(err)
        res.status(400).send('Invalid or expired token');
    }
})


module.exports=UserRouter;