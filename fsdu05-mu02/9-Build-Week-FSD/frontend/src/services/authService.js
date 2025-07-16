import api from './api.js';

const login = async (email, password) => {
  const { data } = await api.post('/api/auth/login', { email, password });
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

const register = async (name, email, password) => {
  const { data } = await api.post('/api/auth/register', { name, email, password });
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

const logout = () => {
  localStorage.removeItem('userInfo');
  // You might also clear cart, shipping info etc. on logout
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('paymentMethod');
};

const authService = {
  login,
  register,
  logout,
};

export default authService;