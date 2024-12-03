import React, { useState } from "react";
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import PopUpChildOverview from "../components/PopUps/PopUpChildOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";

export default function ChildOverviewPage({
  selectedChat,
  setSelectedChat,
  currentReceiverId,

}) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleChildClick = (child, requests) => {
    setSelectedContact({ child, requests }); 
    setPopupVisible(true);
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
    setSelectedContact(null);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setPopupVisible(true);
  };

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview
          title="Child Overview"
          onContactClick={handleContactClick}
          onChildClick={handleChildClick}
          selectedContact={selectedContact}

        />
        <PopUpChildOverview
          isVisible={isPopupVisible}
          onClose={togglePopup}
          contact={selectedContact}           
        />
        <BlurredComponent isBlurred={isPopupVisible}>
          <ChatComponent
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            currentReceiverId={currentReceiverId}
          />
        </BlurredComponent>
      </ColumnContainer>
    </div>
  );
}

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;

const BlurredComponent = styled.div`
  filter: ${({ isBlurred }) => (isBlurred ? "blur(2px)" : "none")};
`;
