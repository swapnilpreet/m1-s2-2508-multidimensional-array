import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projectRef = ref(db, 'projects');
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      const projList = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
      setProjects(projList);
    });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/add">Add Project</Link>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;