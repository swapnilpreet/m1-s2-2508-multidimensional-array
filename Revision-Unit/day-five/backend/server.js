import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Task from "./models/Task.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/task_manager";

app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Mongo connected"))
  .catch((e) => console.error("Mongo error:", e));


app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ status: 1, order: 1, createdAt: 1 });
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const text = (req.body?.text || "").trim();
    if (!text) return res.status(400).json({ error: "Text required" });

    const last = await Task.findOne({ status: "pending" }).sort({ order: -1 });
    const order = last ? last.order + 1 : 0;

    const task = await Task.create({ text, status: "pending", order });
    res.status(201).json(task);
  } catch (e) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fields = {};
    if (req.body.status) fields.status = req.body.status;
    if (typeof req.body.order === "number") fields.order = req.body.order;

    const updated = await Task.findByIdAndUpdate(id, fields, { new: true });
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.listen(PORT, () => console.log(`Backend on http://localhost:${PORT}`));
