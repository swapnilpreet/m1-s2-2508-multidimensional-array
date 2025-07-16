import api from './api.js';

const getUserProfile = async () => {
  const { data } = await api.get('/api/users/profile');
  return data;
};

const updateUserProfile = async (userData) => {
  const { data } = await api.put('/api/users/profile', userData);
  // Update localStorage if user info changes (e.g., name, email)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo) {
    localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, name: data.name, email: data.email, token: data.token }));
  }
  return data;
};

// Add other user-related services like getUsers (admin), deleteUser (admin), etc.

const userService = {
  getUserProfile,
  updateUserProfile,
};

export default userService;