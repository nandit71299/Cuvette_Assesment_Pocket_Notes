// NotificationContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create Notification Context
const NotificationContext = createContext();

// Custom hook to use the Notification Context
export const useNotification = () => {
  return useContext(NotificationContext);
};

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, duration = 3000) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      {notification && <Notification message={notification} />}
    </NotificationContext.Provider>
  );
};

// Notification Component
const Notification = ({ message }) => {
  return <div style={notificationStyle}>{message}</div>;
};

// Styles for the notification
const notificationStyle = {
  position: "absolute",
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "red",
  color: "white",
  padding: "16px",
  borderRadius: "4px",
  zIndex: "1000",
  transition: "opacity 1s ease-in-out",
  opacity: "1",
};

export default NotificationContext;
