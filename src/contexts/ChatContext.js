import React, { createContext, useContext, useState } from "react";
import Parse from "parse/dist/parse.min.js";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [currentReceiverId, setCurrentReceiverId] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [chatUsername, setChatUsername] = useState("");

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
    <ChatContext.Provider
      value={{
        currentReceiverId,
        setCurrentReceiverId,
        setSelectedChat,
        selectedChat,
        messages,
        setMessages,
        chatUsername,
        setChatUsername,
        handleChatClick,
        resetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
