import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/components.css'; // Import component-specific styles

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.message) {
    return null;
  }

  return (
    <div className="notification-container">
      <div className={`notification-toast ${notification.type}`}>
        {notification.message}
      </div>
    </div>
  );
};

export default Notification;