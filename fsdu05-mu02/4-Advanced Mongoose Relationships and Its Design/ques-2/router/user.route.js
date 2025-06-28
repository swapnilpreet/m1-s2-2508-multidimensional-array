const express =require('express');

const UserRouter=express.Router();
const userController=require('../controllers/userController');

UserRouter.post('/add-user',userController.addUser)
UserRouter.post('/rent-book',userController.rentBook)
UserRouter.post('/return-book',userController.returnBook)
UserRouter.get('/user-rentals/:userId',userController.getuserRentals)

module.exports = UserRouter;