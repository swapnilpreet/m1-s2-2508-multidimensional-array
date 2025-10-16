const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,ref:"User"
  }
});

const CourseModel = mongoose.model("Course", CourseSchema);
export default CourseModel;
