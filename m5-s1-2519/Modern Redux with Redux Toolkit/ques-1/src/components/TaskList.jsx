import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, toggleTask } from '../taskSlice';

const TaskList = () => {
  const [taskText, setTaskText] = useState('');
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText('');
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <input
        type="text"
        placeholder="Enter new task"
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
      />
      <button onClick={handleAdd}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                marginRight: '10px',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => dispatch(toggleTask(task.id))}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => dispatch(removeTask(task.id))} style={{ marginLeft: '5px' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
