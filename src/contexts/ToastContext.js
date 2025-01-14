import React, { createContext, useContext, useRef } from "react";
import { toast } from "react-toastify";
//useContext lets to access the values provided by ToastContext.Provider

//Creates the context
const ToastContext = createContext();

//This is our component. All components wrapped inside ToastProvider
//will have access to the displayToast function
export const ToastProvider = ({ children }) => {
  //we use useRef instead of useState because we do not wish to update any state when this one us updated
  const hasDisplayedToast = useRef(false);
  const displayToast = (type, message) => {
    //current is a method that accesses the current useRef object
    if (!hasDisplayedToast.current) {
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
