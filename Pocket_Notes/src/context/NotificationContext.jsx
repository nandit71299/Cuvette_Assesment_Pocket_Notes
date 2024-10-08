import React, { createContext, useContext, useState } from "react";

// Create a Context for notifications
const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

// Notification Provider component
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  // Function to show a notification
  const showNotification = ({ message, danger = false }, duration = 3000) => {
    setNotification({ message, danger });
    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      {notification && <Notification {...notification} />}
    </NotificationContext.Provider>
  );
};

// Notification component for displaying messages
const Notification = ({ message, danger }) => {
  return (
    <div
      style={{
        ...notificationStyle,
        backgroundColor: danger ? "red" : "#23C552",
      }}
    >
      {message}
    </div>
  );
};

// Notification styles
const notificationStyle = {
  position: "absolute",
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  color: "white",
  padding: "16px",
  borderRadius: "4px",
  zIndex: "1000",
  transition: "opacity 1s ease-in-out",
  opacity: "1",
  width: "80%",
};

export default NotificationContext;
