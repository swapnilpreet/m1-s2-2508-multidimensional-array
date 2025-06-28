const express =require('express');
const UserModel = require('../models/user.model');
const ProfileModel = require('../models/profile.model');
const Profilerouter=express.Router();


Profilerouter.post('/add-profile',async(req,res)=>{
    const {bio,socialMediaLinks,user}=req.body;

    try{
        const existUser=await UserModel.findById(user);

        if(!existUser){
            res.status(404).json({msg:"User not found"})
        }

        const existingProfile=await ProfileModel.findOne({user});
        if(existingProfile){
            res.status(404).json({message:"Profile alredy exists for this user"})
        }

        const profile=await ProfileModel.create({bio,socialMediaLinks,user});
        res.status(201).json({message:"profile created",profile});

    }catch(error){
        console.log("Error occured in /add-profile");
        console.log(error);
    }
})

module.exports=Profilerouter;