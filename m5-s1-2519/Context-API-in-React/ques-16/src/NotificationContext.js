import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

let idCounter = 1;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const intervalRef = useRef(null);

  const addNotification = () => {
    const newNotification = {
      id: idCounter++,
      message: 'You have a new message',
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const startNotifications = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(addNotification, 5000);
    }
  };

  const stopNotifications = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startNotifications();
    return () => stopNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAllAsRead, stopNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
