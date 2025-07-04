const express=require('express');
const AuthorRouter=express.Router();
const authorController =require("../controllers/auhorConroller")


AuthorRouter.get('/',authorController.getAllAuthors);//
AuthorRouter.get('/:id',authorController.getAuthorbyId);//
AuthorRouter.post('/',authorController.createAuthor);//
AuthorRouter.put('/:id',authorController.updateAuthor);//
AuthorRouter.delete('/:id',authorController.deleteAuthor);//


module.exports=AuthorRouter;