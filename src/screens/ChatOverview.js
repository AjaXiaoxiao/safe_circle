//import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Parse from "parse/dist/parse.min.js";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import { useChat } from "../contexts/ChatContext";

const ChatOverview = () => {
  const { setSelectedChat, setCurrentReceiverId } = useChat();

  const handleChatClick = (chat) => {
    setSelectedChat(chat);

    const currentUser = Parse.User.current();
    if (currentUser) {
      const receiver = chat.chat
        .get("Participants")
        .find((participant) => participant.id !== currentUser.id);
      if (receiver) {
        setCurrentReceiverId(receiver.id);
      }
    }
  };

  const resetChat = () => {
    setSelectedChat(null);
  };

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar resetChat={resetChat} />
        <SideOverview title="Chats" onChatClick={handleChatClick} />
        <ChatComponent />
      </ColumnContainer>
    </div>
  );
};
export default ChatOverview;

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;
