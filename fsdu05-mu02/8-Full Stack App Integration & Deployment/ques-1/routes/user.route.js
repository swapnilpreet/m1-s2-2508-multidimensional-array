const express=require("express");
const UserModel = require("../models/user.model");
const auth = require("../middlewares/auth.middleware");
const adminCheck = require("../middlewares/role.middleware");
const userRouter=express.Router();

userRouter.get('/profile', auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//done-admin
userRouter.put('/profile', auth, async (req, res) => {
    const { username, email, profile } = req.body;
    
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    
    // For nested profile object
    if (profile) {
        for (const key in profile) {
            if (profile[key] !== undefined) {
                updateFields[`profile.${key}`] = profile[key];
            }
        }
    }

    try {
        // Check for unique username/email if they are being changed
        if (username) {
            const existingUser = await UserModel.findOne({ username: username, _id: { $ne: req.user.id } });
            if (existingUser) return res.status(400).json({ msg: 'Username is already taken' });
        }
        if (email) {
            const existingUser = await UserModel.findOne({ email: email, _id: { $ne: req.user.id } });
            if (existingUser) return res.status(400).json({ msg: 'Email is already registered' });
        }

        const user = await UserModel.findByIdAndUpdate(
            req.user.id, 
            { $set: updateFields }, 
            { new: true, runValidators: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// done
userRouter.get('/users', auth, adminCheck, async (req, res) => {
  try {
    const users = await UserModel.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports=userRouter;