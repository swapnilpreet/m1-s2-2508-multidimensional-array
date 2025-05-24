import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const Settings = () => {
  const { user, updateUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ name: '', email: '' });
  useEffect(() => {
    setFormData({ name: user.name, email: user.email });
  }, [user]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    alert('User info updated!');
  };
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Settings Page</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Info</button>
      </form>
    </div>
  );
};

export default Settings;
