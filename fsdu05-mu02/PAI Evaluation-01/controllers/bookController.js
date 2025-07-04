const AuthorModel = require("../models/author.model");
const BookModel = require("../models/book.model")



exports.getAllBooks=async(req,res,next)=>{
    try {
        const books=await BookModel.find().populate("author");
        res.status(200).json(books);
    } catch (error) {
        next(error)
    }
}


exports.getBooksById=async(req,res,next)=>{
    try {
        const books=await BookModel.findById(req.params.id).populate("author");
        if(!books){
            return res.status(404).json({message:"Book not found"})
        }
        res.status(200).json(books);
    } catch (error) {
        next(error)
    }
}


exports.addBook=async(req,res,next)=>{
    try {
        const books=new BookModel(req.body)
        await books.save();
        res.status(200).json(books);
    } catch (error) {
        next(error)
    }
}



exports.updateBook=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const updatedData=req.body;
        const books=await BookModel.findByIdAndUpdate(id,updatedData);
        if(!books){
            return res.status(404).json({message:"Book not found"})
        }
        res.status(200).json(books);
    } catch (error) {
        next(error)
    }
}


exports.deleteBook=async(req,res,next)=>{
    try {
        const books=await BookModel.findByIdAndDelete(req.params.id);
        if(!books){
            return res.status(404).json({message:"Book not found"})
        }
        res.status(200).json({msg:"book deleted"});
    } catch (error) {
        next(error)
    }
}


exports.getBooksByAuthor=async(req,res,next)=>{
    try {
        const {authorId}=req.params;
        const authorexist=await AuthorModel.findById(authorId);
        if(!authorexist){
            return res.status(404).json({message:"Author not found"})
        }
        const books=await BookModel.find({author:authorId}).populate("author");
        res.status(200).json(books);
    } catch (error) {
        next(error)
    }
}



exports.getAvailableBooksByAuthor=async(req,res,next)=>{
    try {
        const {authorId}=req.params;
        const authorexist=await AuthorModel.findById(authorId);
        if(!authorexist){
            return res.status(404).json({message:"Author not found"})
        }
        const books=await BookModel.find({author:authorId,available:true}).populate("author");
        res.status(200).json(books);
    } catch (error) {
        next(error)
    }
}

