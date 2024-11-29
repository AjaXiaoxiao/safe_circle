import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";

const ChatOverview = ({ title }) => {
  //keeps track of the selected chat
  const [selectedChat, setSelectedChat] = useState(null);

  //handles the chat that is being clicked
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview title={title} onChatClick={handleChatClick} />
        <ChatComponent selectedChat={selectedChat} />
      </ColumnContainer>
    </div>
  );
};
export default ChatOverview;

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;
