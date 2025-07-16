import api from './api.js';

const createOrder = async (order) => {
  const { data } = await api.post('/api/orders', order);
  return data;
};

const getOrderDetails = async (id) => {
  const { data } = await api.get(`/api/orders/${id}`);
  return data;
};

const payOrder = async (orderId, paymentResult) => {
  const { data } = await api.put(`/api/orders/${orderId}/pay`, paymentResult);
  return data;
};

const getMyOrders = async () => {
  const { data } = await api.get('/api/orders/myorders');
  return data;
};

const cartService = {
  createOrder,
  getOrderDetails,
  payOrder,
  getMyOrders,
};

export default cartService;