import React, { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [isAddContactPopupVisible, setAddContactPopUpToVisible] =
    useState(false);
  const [isSelectContactPopupVisible, setSelectContactPopUpToVisible] =
    useState(false);
  const [reloadContactList, setReloadContactList] = useState(0);

  return (
    <ContactContext.Provider
      value={{
        isAddContactPopupVisible,
        setAddContactPopUpToVisible,
        isSelectContactPopupVisible,
        setSelectContactPopUpToVisible,
        reloadContactList,
        setReloadContactList,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  return useContext(ContactContext);
};
