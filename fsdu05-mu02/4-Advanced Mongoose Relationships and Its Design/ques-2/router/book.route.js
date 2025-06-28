const express = require("express");
const BookModel = require("../model/book.model");
const BookRouter = express.Router();
const bookController =require('../controllers/bookController');

BookRouter.post("/add-book", bookController.addBook);
BookRouter.get("/book-renters/:bookId", bookController.getsinglebookRented);
BookRouter.put("/update-book/:bookId", bookController.updatesbook);
BookRouter.delete("/delete-book/:bookId", bookController.deleteBook);
module.exports = BookRouter;
