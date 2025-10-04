const TaskModel = require("../models/Task.model");

async function checkMembership(boardId, userId) {
  const board = await BoardModel.findById(boardId);
  if (!board) {
    throw new Error("Board not found");
  }
  const ismember = board.members.find(
    (m) => m.user._id.toString() === userId.toString()
  );
  if (!ismember) {
    throw new Error("not a member");
  }
  return { board, ismember };
}

exports.createTask = async (req, res) => {
  try {
    const {
      boardId,
      columnId,
      title,
      description,
      status,
      assignedto,
      dueDate,
    } = req.body;
    const { board, ismember } = await checkMembership(boardId, req.user._id);
    const column = board.columns.find((c) => c._id.toString() === columnId);
    if (!column) {
      return res.status(400).json({ message: "Invalid column ID" });
    }
    const task = new TaskModel({
      title,
      description,
      status,
      board: boardId,
      column: columnId,
      creator: req.user._id,
      assignedto,
      dueDate,
    });
    await task.save();
    await ActivityModel.create({
      board: board._id,
      user: req.user._id,
      action: `created task ${task.title}`,
    });
    res.status(201).json(task);
  } catch (error) {
    if (error.message === "Board not found") {
      return res.status(404).json({ message: error.message });
    } else if (error.message === "not a member") {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const {
      columnId,
      page = 1,
      limit = 10,
      search = "",
      assignedto,
      dueDate,
    } = req.query;
    await checkMembership(boardId, req.user._id);
    const filter = { board: boardId };

    if (columnId) {
      filter.column = columnId;
    }
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (assignedto) {
      filter.assignedto = assignedto;
    }
    if (dueDate) {
      const date = new Date(dueDate);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      filter.dueDate = { $gte: date, $lt: nextDate };
    }
    const skip = (page - 1) * limit;
    const tasks = await TaskModel.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("assignedto", "name email")
      .populate("creator", "name email");
    const total = await TaskModel.countDocuments(filter);
    res.json({
      tasks,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, assignedto, dueDate } = req.body;
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await checkMembership(task.board, req.user._id);
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (assignedto) task.assignedto = assignedto;
    if (dueDate) task.dueDate = dueDate;
    await task.save();
    await ActivityModel.create({
      board: task.board,
      user: req.user._id,
      action: `updated task ${task.title}`,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.moveTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { toColumnId } = req.body;
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const { board } = await checkMembership(task.board, req.user._id);
    const toColumn = board.columns.find((c) => c._id.toString() === toColumnId);
    if (!toColumn) {
      return res.status(400).json({ message: "Invalid column ID" });
    }
    task.column = toColumnId;
    await task.save();
    await ActivityModel.create({
      board: task.board,
      user: req.user._id,
      action: `moved task ${task.title} to column ${toColumn.title}`,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await checkMembership(task.board, req.user._id);
    await task.remove();
    await ActivityModel.create({
      board: task.board,
      user: req.user._id,
      action: `deleted task ${task.title}`,
      meta: { taskId: id },
    });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
