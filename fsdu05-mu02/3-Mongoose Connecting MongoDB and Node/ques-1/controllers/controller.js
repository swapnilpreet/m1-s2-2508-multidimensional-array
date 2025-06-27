const Task = require('../models/model');

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 

const getTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.dueDate) filter.dueDate = { $lte: new Date(req.query.dueDate) };

    const tasks = await Task.find(filter);
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
