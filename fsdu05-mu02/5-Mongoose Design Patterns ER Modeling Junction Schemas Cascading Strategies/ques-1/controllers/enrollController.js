const CourseModel = require("../models/course.model");
const EnrollmentModel = require("../models/enrollmentJunction.model");
const StudentModel = require("../models/student.model");




exports.addEnroll=async(req,res)=>{
    try {
        const {studentId,courseId}=req.body;
        const student= await StudentModel.findById(studentId);
        const course= await CourseModel.findById(courseId);

        if(!student.isActive || !course.isActive ){
            return res.status(400).json({message:"IsActive false"});
        }

        const Course=new EnrollmentModel(req.body);
        await Course.save();
        res.status(201).json({message:"Course created",Course});
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
