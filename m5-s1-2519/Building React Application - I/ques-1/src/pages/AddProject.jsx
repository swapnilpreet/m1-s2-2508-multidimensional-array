import { useState } from 'react';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const newProject = { title, description, createdAt: Date.now() };
    await push(ref(db, 'projects'), newProject);
    navigate('/');
  };

  return (
    <form onSubmit={handleAdd}>
      <h2>Add Project</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddProject;