//import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Parse from "parse/dist/parse.min.js";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChat } from "../contexts/ChatContext";

const ChatOverview = ({ currentReceiverId, setCurrentReceiverId }) => {
  const { setSelectedChat } = useChat();

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

  const displayToast = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Topbar />
      <ColumnContainer>
        <Sidebar resetChat={resetChat} displayToast={displayToast} />
        <SideOverview
          title="Chats"
          onChatClick={handleChatClick}
          setCurrentReceiverId={setCurrentReceiverId}
          displayToast={displayToast}
        />
        <ChatComponent
          currentReceiverId={currentReceiverId}
          displayToast={displayToast}
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
