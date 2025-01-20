import React, { createContext, useContext, useRef } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext(); //allow access

export const ToastProvider = ({ children }) => {
  const hasDisplayedToast = useRef(false);

  const displayToast = (type, message) => {
    if (!hasDisplayedToast.current) { //only one toast display at a time
      hasDisplayedToast.current = true;

      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
      setTimeout(() => {
        hasDisplayedToast.current = false;
      }, 3000);
    }
  };
  return (
    <ToastContext.Provider value={{ displayToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
