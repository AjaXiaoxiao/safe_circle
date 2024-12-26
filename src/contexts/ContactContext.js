import React, { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [isAddContactPopupVisible, setAddContactPopUpToVisible] =
    useState(false);
  const [isSelectContactPopupVisible, setSelectContactPopUpToVisible] =
    useState(false);

  return (
    <ContactContext.Provider
      value={{
        isAddContactPopupVisible,
        setAddContactPopUpToVisible,
        isSelectContactPopupVisible,
        setSelectContactPopUpToVisible,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  return useContext(ContactContext);
};
