import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import SelectContact from "../components/PopUps/SelectContact";
import styled from "styled-components";

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;

const ContactsPage = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [clearSelection, setClearSelection] = useState(false);


  const handleContactClick = (contactName) => {
    setSelectedContact(contactName);
    setIsPopupVisible(true); 
    setClearSelection(false);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedContact(null);
    setClearSelection(true); 
  };

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview 
          title="Contacts" 
          onContactClick={handleContactClick} 
          context="Contacts" 
          clearSelection={clearSelection} 
        />
      </ColumnContainer>
      {isPopupVisible && (
        <SelectContact 
          isVisible={isPopupVisible} 
          onClose={handleClosePopup} 
          contactName={selectedContact} 
        />
      )}
    </div>
  );
};

export default ContactsPage;
