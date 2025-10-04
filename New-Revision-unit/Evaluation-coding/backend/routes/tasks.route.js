const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  moveTask,
} = require("../controllers/task.controllers");

router.post("/", authMiddleware, createTask);
router.post("/move/:taskId", authMiddleware, moveTask);
router.get("/:boardId", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
module.exports = router;
