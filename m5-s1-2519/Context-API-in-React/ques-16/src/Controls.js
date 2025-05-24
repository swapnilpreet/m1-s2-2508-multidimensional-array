import React from 'react';
import { useNotifications } from './NotificationContext';

const Controls = () => {
  const { markAllAsRead, stopNotifications } = useNotifications();

  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={markAllAsRead} style={{ marginRight: '10px' }}>
        Mark All as Read
      </button>
      <button onClick={stopNotifications}>Stop Notifications</button>
    </div>
  );
};

export default Controls;
