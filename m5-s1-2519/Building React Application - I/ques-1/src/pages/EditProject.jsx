import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, update, get } from 'firebase/database';

const EditProject = () => {
  const [project, setProject] = useState({ title: '', description: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      const snapshot = await get(ref(db, `projects/${id}`));
      if (snapshot.exists()) setProject(snapshot.val());
    };
    fetchProject();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await update(ref(db, `projects/${id}`), project);
    navigate('/');
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Project</h2>
      <input value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} />
      <textarea value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProject;