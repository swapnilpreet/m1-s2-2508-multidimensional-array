const mongoose = require("mongoose");
const EnrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,ref:"User"
  },
  course: {
   type: mongoose.Schema.Types.ObjectId,ref:"Course"
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

const EnrollmentModel = mongoose.model("Enrollment", EnrollmentSchema);
export default EnrollmentModel;
