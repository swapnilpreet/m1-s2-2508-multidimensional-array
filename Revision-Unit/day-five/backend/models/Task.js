import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    status: { type: String, enum: ["pending", "completed"], default: "pending", index: true },
    order: { type: Number, default: 0, index: true }
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);



