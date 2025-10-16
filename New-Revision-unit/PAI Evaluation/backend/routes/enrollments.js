const express = require("express");
const { auth } = require("../middleware/authmoddleware");
const CourseModel = require("../model/Course.model");
const EnrollmentModel = require("../model/Enrollment.model");
const router = express.Router();


router.post("/enroll/:courseId", auth, async (req, res) => {
  const course = await CourseModel.findById(req.params.courseId);
  if (!course) return res.status(404).json({ msg: "Course not found" });

  const alreadyEnrolled = await EnrollmentModel.findOne({
    user: req.user._id,
    course: course._id,
  });
  if (alreadyEnrolled) return res.status(400).json({ msg: "Already enrolled" });

  const enrollment = new EnrollmentModel({
    user: req.user._id,
    course: course._id,
  });
  await enrollment.save();
  res.json(enrollment);
});

router.get("/my-courses", auth, async (req, res) => {
  const enrollments = await EnrollmentModel.find({
    user: req.user.id,
  }).populate("course");
  res.json(enrollments.map((e) => e.course));
});

module.exports = router;
