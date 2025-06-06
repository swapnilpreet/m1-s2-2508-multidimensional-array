import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { ref, onValue, push} from 'firebase/database';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    const projRef = ref(db, `projects/${id}`);
    onValue(projRef, (snapshot) => {
      setProject(snapshot.val());
    });

    const taskRef = ref(db, `projects/${id}/tasks`);
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      const taskList = data ? Object.entries(data).map(([tid, val]) => ({ id: tid, ...val })) : [];
      setTasks(taskList);
    });
  }, [id]);

  const addTask = async () => {
    await push(ref(db, `projects/${id}/tasks`), {
      title: taskText,
      completed: false,
      createdAt: Date.now(),
      priority: 'normal'
    });
    setTaskText('');
  };

  return (
    <div>
      <h2>{project?.title}</h2>
      <p>{project?.description}</p>
      <input value={taskText} onChange={(e) => setTaskText(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title} - {task.priority}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;