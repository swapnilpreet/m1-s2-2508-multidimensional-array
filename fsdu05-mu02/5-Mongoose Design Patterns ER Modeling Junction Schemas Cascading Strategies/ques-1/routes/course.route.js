const express =require('express');

const CourseRouter=express.Router();
const controller=require('../controllers/couseController')

CourseRouter.post('/', controller.addCourse)
CourseRouter.delete('/:id', controller.deleteCourse)
CourseRouter.get('/:id/students', controller.getActiveStudentsForCourse)

module.exports = CourseRouter;
