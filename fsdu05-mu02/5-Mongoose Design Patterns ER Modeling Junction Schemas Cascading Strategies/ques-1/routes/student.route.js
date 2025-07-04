const express =require('express');
const StudentRouter=express.Router();


const controller=require('../controllers/studentController')

StudentRouter.post('/',controller.addStudent)
StudentRouter.delete('/:id',controller.deleteStudent)
StudentRouter.get('/:id/courses',controller.getActiveCoursesForStudent)
module.exports = StudentRouter;
