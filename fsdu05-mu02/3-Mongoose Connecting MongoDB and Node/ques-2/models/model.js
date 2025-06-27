const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: String,
  isCompleted: { type: Boolean, default: false },
  completionDate: Date,
  dueDate: Date,
});

module.exports = mongoose.model("Task", taskSchema);
