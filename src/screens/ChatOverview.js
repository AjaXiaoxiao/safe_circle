import React from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import styled from "styled-components";

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;

const ChatPage = () => {
  const navigate = useNavigate();

  const handleContactClick = (contactName) => {
    navigate(`/`); // We have to add some logic here. When a contact is being clicked on
                   // it should navigate to the correct route for the chat with this contact 
  };

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview 
          title="Chats" 
          onContactClick={handleContactClick} 
          context="Chat" 
        />
        <ChatComponent />
      </ColumnContainer>
    </div>
  );
};

export default ChatPage;
