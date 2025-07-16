import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../slices/orderSlice.js'; // Assuming you'll create this thunk
import OrderHistoryItem from '../components/orders/OrderHistoryItem.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import '../styles/pages.css'; // Assuming page-specific styles

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders); // Assuming 'orders' slice

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="upload-message error text-center">Failed to load orders: {error}</p>;
  }

  return (
    <div className="order-history-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">You have no past orders.</p>
      ) : (
        <div className="order-history-list">
          {orders.map((order) => (
            <OrderHistoryItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;