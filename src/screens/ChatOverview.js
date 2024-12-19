//import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";

const ChatOverview = ({
  selectedChat,
  setSelectedChat,
  currentReceiverId,
  setCurrentReceiverId,
}) => {

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const resetChat = () => {
    setSelectedChat(null);
  }

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar resetChat={resetChat} />
        <SideOverview
          title="Chats"
          onChatClick={handleChatClick}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
          setCurrentReceiverId={setCurrentReceiverId}
        />
        <ChatComponent
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          currentReceiverId={currentReceiverId}
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
