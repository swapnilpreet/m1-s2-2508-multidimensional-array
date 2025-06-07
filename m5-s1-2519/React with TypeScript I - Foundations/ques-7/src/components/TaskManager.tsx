import React, { useState } from 'react';
 
enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

interface Task {
  id: number;
  description: string;
  completed: boolean;
  priority: Priority;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  const addTask = (): void => {
    if (!description.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      description,
      completed: false,
      priority
    };

    setTasks([...tasks, newTask]);
    setDescription('');
    setPriority(Priority.MEDIUM);
  };

  const toggleTaskCompletion = (id: number): void => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div>
      <h2>Task Manager</h2>
 
      <div>
        <input
          type="text"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Task description"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          aria-label="Select priority"
        >
          <option value={Priority.LOW}>Low</option>
          <option value={Priority.MEDIUM}>Medium</option>
          <option value={Priority.HIGH}>High</option>
        </select>
        <button onClick={addTask}>
          Add
        </button>
      </div>

  
      <div>
        <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
          All
        </button>
        <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>
          Completed
        </button>
        <button onClick={() => setFilter('incomplete')} disabled={filter === 'incomplete'}>
          Incomplete
        </button>
      </div>
 
      <ul>
        {filteredTasks.length === 0 ? (
          <p>No tasks to display.</p>
        ) : (
          filteredTasks.map(task => (
            <li
              key={task.id}
              style={{
                marginBottom: '0.75rem',
                border: '1px solid #ccc',
                padding: '0.75rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                style={{ marginRight: '0.75rem' }}
                aria-label={`Mark ${task.description} as ${task.completed ? 'incomplete' : 'complete'}`}
              />
              <div>
                <strong>{task.description}</strong> <br />
                <small>Priority: {task.priority}</small>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskManager;
