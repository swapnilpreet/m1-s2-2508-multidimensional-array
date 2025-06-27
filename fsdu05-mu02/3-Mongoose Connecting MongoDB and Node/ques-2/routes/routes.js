const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTasksByPriority,
} = require('../controllers/controller');

const { validateTaskData } = require('../middleware/middleware');
 
router.post('/tasks', validateTaskData, createTask);
 
router.get('/tasks', getTasks);
 
router.patch('/tasks/:id', validateTaskData, updateTask);
 
router.delete('/tasks', deleteTasksByPriority);

module.exports = router;
