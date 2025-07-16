import React from 'react';
import '../../styles/components.css'; // Import component-specific styles

const OrderTracking = ({ order }) => {
  if (!order) {
    return <p className="text-center">No order details to track.</p>;
  }

  // Define steps and their completion status
  const steps = [
    { name: 'Order Placed', date: order.createdAt, isCompleted: true },
    { name: 'Paid', date: order.paidAt, isCompleted: order.isPaid },
    { name: 'Shipped', date: order.shippedAt, isCompleted: order.isShipped }, // Assuming you add isShipped and shippedAt to Order model
    { name: 'Delivered', date: order.deliveredAt, isCompleted: order.isDelivered },
  ];

  // Determine current active step
  const activeStepIndex = steps.findIndex(step => !step.isCompleted) - 1; // Last completed step index
  const currentProgress = ((activeStepIndex + 1) / steps.length) * 100;

  return (
    <div className="order-tracking-container">
      <h3>Order Status: {order.isDelivered ? 'Delivered' : order.isPaid ? 'Processing' : 'Pending Payment'}</h3>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${currentProgress}%` }}></div>
      </div>
      <div className="tracking-steps">
        {steps.map((step, index) => (
          <div key={index} className={`tracking-step ${step.isCompleted ? 'completed' : ''} ${index === activeStepIndex + 1 ? 'active' : ''}`}>
            <div className="step-icon">
              {step.isCompleted ? '✔' : '○'} {/* Checkmark or circle icon */}
            </div>
            <p className="step-name">{step.name}</p>
            {step.date && <small className="step-date">{new Date(step.date).toLocaleDateString()}</small>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;