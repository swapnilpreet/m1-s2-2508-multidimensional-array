const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/controller');

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.patch('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
