import React, { useState } from "react";
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import SelectContact from "../components/PopUps/SelectContact";

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;

export default function ChatOverview() {
  
  const [isPopupVisible, setIsPopupVisible] = useState(false); 
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactClick = (contactName) => {
    setSelectedContact(contactName); 
    setIsPopupVisible(true); 
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedContact(null); 
  };

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview title="Contacts" onContactClick={handleContactClick} />
        <ChatComponent />
      </ColumnContainer>
      <SelectContact 
        isVisible={isPopupVisible} 
        onClose={handleClosePopup} 
        contactName={selectedContact} 
      />
    </div>
  );
}
