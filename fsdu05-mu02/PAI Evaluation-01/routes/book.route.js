const express=require('express');
const bookRouter=express.Router();
const bookController =require("../controllers/bookController")


bookRouter.get('/',bookController.getAllBooks);//
bookRouter.get('/:id',bookController.getBooksById);//
bookRouter.get('/author/:authorId',bookController.getBooksByAuthor);//
bookRouter.get('/author/:authorId/available',bookController.getAvailableBooksByAuthor);//

bookRouter.post('/',bookController.addBook);//

bookRouter.put('/:id',bookController.updateBook);//
bookRouter.delete('/:id',bookController.deleteBook);//


module.exports=bookRouter;