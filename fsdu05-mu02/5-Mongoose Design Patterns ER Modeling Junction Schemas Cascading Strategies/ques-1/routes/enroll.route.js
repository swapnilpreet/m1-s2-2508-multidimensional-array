const express =require('express');

const EnrollRouter=express.Router();
const controller=require('../controllers/enrollController')

EnrollRouter.post('/',controller.addEnroll)
module.exports = EnrollRouter;