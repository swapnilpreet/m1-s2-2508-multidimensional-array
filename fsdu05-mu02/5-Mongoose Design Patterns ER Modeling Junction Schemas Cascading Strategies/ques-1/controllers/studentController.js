const EnrollmentModel = require("../models/enrollmentJunction.model");
const StudentModel = require("../models/student.model");



exports.addStudent=async(req,res)=>{
    try {
        const Student=await StudentModel.create(req.body);
        await Student.save();
        res.status(201).json({message:"Student created",Student});
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

exports.deleteStudent=async(req,res)=>{
    try {
         const { id } = req.params;
        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        const enrollments = await EnrollmentModel.find({ studentId: id });
        await Promise.all(
            enrollments.map((enroll) => {
                enroll.isActive = false;
                return enroll.save();
            })
        );
        student.isActive = false;
        await student.save();

        res.status(200).json({ message: "Student deleted (soft delete performed)" });
    } catch (error) {
        res.send(400).json({error:error.message})
    }
}


exports.getActiveCoursesForStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await StudentModel.findById(id);
        if (!student || !student.isActive) {
            return res.status(404).json({ error: "Active student not found" });
        }
        const enrollments = await EnrollmentModel.find({
            studentId: id,
            isActive: true
        }).populate({
            path: "courseId",
            match: { isActive: true }
        });
        const activeCourses = enrollments.map(enroll => enroll.courseId).filter(course => course != null);
        res.status(200).json(activeCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};