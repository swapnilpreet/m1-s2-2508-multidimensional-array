const AuthorModel = require("../models/author.model");
const BookModel = require("../models/book.model");



exports.getAllAuthors=async(req,res,next)=>{
    try {
        const authors=await AuthorModel.find();
        res.json(authors);
    } catch (error) {
        next(error);
    }
}

exports.getAuthorbyId=async(req,res,next)=>{
    try {
        const author=await AuthorModel.findById(req.params.id);
        if(!author){
            return res.status(404).josn({error:"Author not found"})
        }
        res.json(author);
    } catch (error) {
        next(error)
    }
}

exports.createAuthor=async(req,res,next)=>{
    try {
        const Author=new AuthorModel(req.body);
        await Author.save();
        res.status(201).json(Author);
    } catch (error) {
        next(error)
    }
}

exports.updateAuthor=async(req,res,next)=>{
    try {
        const author=await AuthorModel.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        if(!author){
            return res.status(404).json({error:"Author not found"});
        }
        res.json(author)
    } catch (error) {
        next(error);
    }
}

exports.deleteAuthor=async(req,res,next)=>{
    try {
        const books=await BookModel.find({author:req.params.id});
        if(books.length>0){
            return res.status(400).json({error:"Cant delete author many books associate with author"})
        }

        const deleteAuthor=await AuthorModel.findByIdAndDelete(req.params.id);

        if(!deleteAuthor){
            return res.status(404).json({error:"Authoe not found"})
        }
        res.status(200).json({msg:"Author Deleted"})
    } catch (error) {
        next(err)
    }
}

