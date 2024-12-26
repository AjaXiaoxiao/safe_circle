import React, { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [isAddContactPopupVisible, setAddContactPopUpToVisible] =
    useState(false);
  const [isSelectContactPopupVisible, setSelectContactPopUpToVisible] =
    useState(false);

  const location = useLocation();

  const handleOpenAddContactPopup = () => {
    if (location.pathname === "/ContactsOverview") {
      setAddContactPopUpToVisible(true);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        isAddContactPopupVisible,
        setAddContactPopUpToVisible,
        isSelectContactPopupVisible,
        setSelectContactPopUpToVisible,
        handleOpenAddContactPopup,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  return useContext(ContactContext);
};
