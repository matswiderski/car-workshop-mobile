import { createContext, useContext, useState } from "react";

const NotifyContext = createContext();
export const useNotify = () => {
  return useContext(NotifyContext);
};

export const NotifyContextProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });
  const context = {
    notification,
    setNotification,
  };
  return (
    <NotifyContext.Provider value={context}>{children}</NotifyContext.Provider>
  );
};
