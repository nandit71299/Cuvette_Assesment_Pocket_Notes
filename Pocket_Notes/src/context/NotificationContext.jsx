import React, { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

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

const Notification = ({ message }) => {
  return <div style={notificationStyle}>{message}</div>;
};

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
