const CourseModel = require("../models/course.model");
const EnrollmentModel = require("../models/enrollmentJunction.model");




exports.addCourse=async(req,res)=>{
    try {
        const Course=new CourseModel(req.body);
        await Course.save();
        res.status(201).json({message:"Course created",Course});
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


exports.deleteCourse=async(req,res)=>{
    try {
        const { id } = req.params;
        const Course = await CourseModel.findById(id);
        if (!Course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const enrollments = await EnrollmentModel.find({ courseId: id });
        await Promise.all(
            enrollments.map((enroll) => {
                enroll.isActive = false;
                return enroll.save();
            })
        );
        Course.isActive = false;
        await Course.save();
        res.status(200).json({ message: "Course deleted (soft delete performed)" });
    } catch (error) {
        res.send(400).json({error:error.message})
    }
}


exports.getActiveStudentsForCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await CourseModel.findById(id);
        if (!course || !course.isActive){
            return res.status(404).json({ error: "Active course not found"});
        }
        const enrollments = await EnrollmentModel.find({
            courseId:id,
            isActive:true
        }).populate({
            path:"studentId",
            match:{isActive:true}
        });
        const activeStudents = enrollments.map(enroll => enroll.studentId).filter(student => student != null);

        res.status(200).json(activeStudents);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
