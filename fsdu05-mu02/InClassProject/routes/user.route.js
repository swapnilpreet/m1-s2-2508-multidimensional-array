const express=require('express');
const UserModel = require('../models/user.model');
const bcrypt =require('bcrypt')
const UserRouter=express.Router();

UserRouter.post('/signup',async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(500).json({message:"Something wrong in signup route",err})
            }else{
                await UserModel.create({username,email,password:hash})
            }
        })
        res.status(201).json({message:"signup Sucess"})
        
    } catch (error) {
        res.status(500).json({message:"Something wrong in signup route",error})
    }
})

module.exports=UserRouter;