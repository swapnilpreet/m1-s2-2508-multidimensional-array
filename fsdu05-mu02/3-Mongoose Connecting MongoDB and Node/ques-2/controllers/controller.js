const Task = require('../models/model');

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 
const getTasks = async (req, res) => {
  try {
    const { priority, isCompleted } = req.query;
    const filter = {};
    if (priority) filter.priority = priority;
    if (isCompleted !== undefined) filter.isCompleted = isCompleted === 'true';
    
    const tasks = await Task.find(filter);
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 
const updateTask = async (req, res) => {
  try {
    const { title, priority, description, isCompleted } = req.body;

    const updateFields = {};
    if (title) updateFields.title = title;
    if (priority) updateFields.priority = priority;
    if (description) updateFields.description = description;
    if (isCompleted !== undefined) {
      updateFields.isCompleted = isCompleted;
      if (isCompleted === true) {
        updateFields.completionDate = new Date();
      }
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 
const deleteTasksByPriority = async (req, res) => {
  try {
    const { priority } = req.query;
    if (!priority) return res.status(400).json({ error: "Priority filter required" });

    const result = await Task.deleteMany({ priority });
    res.status(200).json({ message: `Deleted ${result.deletedCount} task(s)` });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTasksByPriority };
