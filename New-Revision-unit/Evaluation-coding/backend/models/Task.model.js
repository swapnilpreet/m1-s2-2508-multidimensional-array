const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dueDate: { type: Date },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);
const TaskModel = mongoose.model("Task", TaskSchema);
module.exports = TaskModel;
