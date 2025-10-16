const express = require("express");
const { auth, admin } = require("../middleware/authmoddleware");
const CourseModel = require("../model/Course.model");
const router = express.Router();

router.post("/", auth, admin, async (req, res) => {
  const course = new CourseModel({ ...req.body, createdBy: req.user._id });
  await course.save();
  res.json(course);
});

router.get("/", async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const courses = await CourseModel.find({ title: { $regex: search, $options: "i" } })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(courses);
});

router.put("/:id", auth, admin, async (req, res) => {
  const course = await CourseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(course);
});

router.delete("/:id", auth, admin, async (req, res) => {
  await CourseModel.findByIdAndDelete(req.params.id);
  res.json({ msg: "Course deleted" });
});

module.exports = router;
