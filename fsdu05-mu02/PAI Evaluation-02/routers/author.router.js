const express=require("express");
const AuthModel = require("../models/book.model");
const AuthorRouter=express.Router();


AuthorRouter.get('/',async(req,res)=>{
    const books = await AuthModel.find({ isDeleted: false }).populate('author', 'name bio');
    res.status(201).json(books);
})


module.exports=AuthorRouter;