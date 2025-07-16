const express =require('express');
const TodoModel = require('../models/todo.model');
const authMiddleware = require('../middleware/auth.middleware');

const TodoRoute=express.Router();

TodoRoute.post("/todo",authMiddleware(['user','admin']), async(req,res)=>{
    try {
        // console.log(req.user)
        const todo=await TodoModel.create({...req.body,userId:req.user});
        res.status(200).json({message:"todo created",todo})
    } catch (error) {
        res.status(500).json({type:"error Coccured in add totos route",error})

    }
})

TodoRoute.get("/todo",authMiddleware(['user','admin']), async(req,res)=>{
    try {
        // console.log(req.user)
        const todo=await TodoModel.find({userId:req.user});
        res.status(200).json({message:"todo created",todo})
    } catch (error) {
        res.status(500).json({message:"error Coccured in add totos route",error})
    }
})
module.exports=TodoRoute;