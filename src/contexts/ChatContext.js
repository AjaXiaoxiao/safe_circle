import React, { createContext, useContext, useState } from "react";
import Parse from "parse/dist/parse.min.js";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [currentReceiverId, setCurrentReceiverId] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [chatUsername, setChatUsername] = useState("");
  const [chatUpdateTrigger, setChatUpdateTrigger] = useState(0);

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
        chatUpdateTrigger,
        setChatUpdateTrigger,
        handleChatClick,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
