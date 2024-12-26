import React, { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [isAddContactPopupVisible, setAddContactPopUpToVisible] =
    useState(false);
  const [isSelectContactPopupVisible, setSelectContactPopUpToVisible] =
    useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const location = useLocation();

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setSelectContactPopUpToVisible(true);
  };

  const handleOpenAddContactPopup = () => {
    if (location.pathname === "/ContactsOverview") {
      setAddContactPopUpToVisible(true);
    }
  };

  const handleClosePopup = () => {
    setAddContactPopUpToVisible(false);
    setSelectContactPopUpToVisible(false);
    setSelectedContact(null);
  };

  return (
    <ContactContext.Provider
      value={{
        isAddContactPopupVisible,
        setAddContactPopUpToVisible,
        isSelectContactPopupVisible,
        setSelectContactPopUpToVisible,
        selectedContact,
        setSelectedContact,
        handleContactClick,
        handleClosePopup,
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
