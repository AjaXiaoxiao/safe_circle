import React, { createContext, useContext, useState } from "react";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [isAddContactPopupVisible, setAddContactPopUpToVisible] =
    useState(false);
  const [isSelectContactPopupVisible, setSelectContactPopUpToVisible] =
    useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <ContactContext.Provider
      value={{
        isAddContactPopupVisible,
        setAddContactPopUpToVisible,
        isSelectContactPopupVisible,
        setSelectContactPopUpToVisible,
        selectedContact,
        setSelectedContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  return useContext(ContactContext);
};
