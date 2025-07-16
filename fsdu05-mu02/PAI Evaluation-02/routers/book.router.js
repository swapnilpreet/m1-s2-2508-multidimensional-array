
const express=require("express");
const BookModel = require("../models/book.model");

const BookRouter=express.Router();


BookRouter.get('/',async(req,res)=>{
    const books = await BookModel.find({ isDeleted: false }).populate('author', 'name bio');
    res.status(201).json(books);
})


BookRouter.post('/',async(req,res)=>{
    const { title, genre, price, pages } = req.body;
    if (!title || !genre || !price || !pages) {
        res.status(400);
        throw new Error('Please enter all required fields: title, authorId, genre, price, pages');
    }
    const authorExists = await AuthorModel.findById(authorId);
    if (!authorExists) {
        res.status(400);
        throw new Error('Author not found with the provided authorId');
    }
    const bookExists = await BookModel.findOne({ title });
    if (bookExists) {
        res.status(400);
        throw new Error('Book with this title already exists');
    }
    const book = await BookModel.create({
        title,
        author: req.user._id,
        genre,
        price,
        pages,
    });

    res.status(201).json(book);
})


BookRouter.delete('/:id',async(req,res)=>{
    const book = await BookModel.findById(req.params.id);
    if (book) {
        book.isDeleted = true;
        await book.save();
        res.json({ message: 'Book soft-deleted' });
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
})



module.exports=BookRouter;