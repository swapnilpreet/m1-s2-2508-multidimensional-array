import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components.css'; // Import component-specific styles

const OrderHistoryItem = ({ order }) => {
  return (
    <div className="order-history-item">
      <div className="order-summary">
        <h4>Order ID: {order._id}</h4>
        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>Total: ${order.totalPrice.toFixed(2)}</p>
        <p>Paid: {order.isPaid ? `Yes (${new Date(order.paidAt).toLocaleDateString()})` : 'No'}</p>
        <p>Delivered: {order.isDelivered ? `Yes (${new Date(order.deliveredAt).toLocaleDateString()})` : 'No'}</p>
      </div>
      <div className="order-items-preview">
        <h5>Items:</h5>
        <ul>
          {order.orderItems.slice(0, 3).map((item) => ( // Show first 3 items
            <li key={item.product}>
              {item.name} ({item.qty})
            </li>
          ))}
          {order.orderItems.length > 3 && <li>...and {order.orderItems.length - 3} more</li>}
        </ul>
      </div>
      <div className="order-actions">
        <Link to={`/orders/${order._id}`} className="btn btn-secondary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default OrderHistoryItem;