//import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";

const ChatOverview = ({ selectedChat, setSelectedChat }) => {
  //keeps track of the selected chat
  //const [selectedChat, setSelectedChat] = useState(null);

  //handles the chat that is being clicked
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleContactClick = (contact) => {
    const newChat = {
      chat: null,
      username: contact.username,
    };
    setSelectedChat(newChat);
  };

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview
          title="Chats"
          onContactClick={handleContactClick} 
          onChatClick={handleChatClick}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
        />
        <ChatComponent
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </ColumnContainer>
    </div>
  );
};
export default ChatOverview;

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;
