import React from 'react';
import { NotificationProvider } from './NotificationContext';
import NotificationList from './NotificationList';
import Controls from './Controls';

const App = () => {
  return (
    <NotificationProvider>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Real-Time Notification Panel</h1>
        <NotificationList />
        <Controls />
      </div>
    </NotificationProvider>
  );
};

export default App;
