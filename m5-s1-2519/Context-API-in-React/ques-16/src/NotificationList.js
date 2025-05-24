import React from 'react';
import { useNotifications } from './NotificationContext';

const NotificationList = () => {
  const { notifications } = useNotifications();

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 && <p>No notifications yet.</p>}
      <ul>
        {notifications.map(notification => (
          <li
            key={notification.id}
            style={{
              fontWeight: notification.read ? 'normal' : 'bold',
              background: notification.read ? '#f4f4f4' : '#d4f0ff',
              padding: '8px',
              marginBottom: '5px',
              borderRadius: '5px',
            }}
          >
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
