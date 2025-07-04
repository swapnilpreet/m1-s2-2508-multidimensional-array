const mongoose =require('mongoose');

const EnrollmentSchema=  new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
  enrolledAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
})

const EnrollmentModel=mongoose.model("enrollment",EnrollmentSchema);

module.exports=EnrollmentModel;