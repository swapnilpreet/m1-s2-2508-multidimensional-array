const express=require("express");
const Userrouter=express.Router();
const UserModel = require("../models/user.model");

Userrouter.post("/add-user",async(req,res)=>{
    const {name,email}=req.body;

    try{
        const user = await UserModel.create({name,email});
        res.status(201).json({msg:"User created",data:user})
    }catch(error){
        console.log("error occured in route /add-user")
        res.status(500).json({msg:"error ocuured in /add-user",error:error.message})
    }
})

module.exports=Userrouter;