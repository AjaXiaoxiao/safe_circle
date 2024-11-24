import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import SelectContact from "../components/PopUps/SelectContact"; 
import { useState } from "react";

export default function Contacts() {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
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
      {isPopupVisible && (
        <SelectContact
          isVisible={isPopupVisible}
          onClose={handleClosePopup}
          contact={selectedContact}
        />
      )}
    </div>
  );
}

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;