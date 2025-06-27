const Task = require("../models/model");

const validateTaskData = async (req, res, next) => {
  const { title, description, priority } = req.body;
  const validPriorities = ["low", "medium", "high"];

  if (!title || !description || !priority) {
    return res.status(400).json({ error: "Incomplete Data Received" });
  }

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({ error: "Priority must be one of: low, medium, high" });
  }

  const existing = await Task.findOne({ title });
  if (req.method === "POST" && existing) {
    return res.status(409).json({ error: "Task title must be unique" });
  }

  next();
};

module.exports = { validateTaskData };
