import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [currentReceiverId, setCurrentReceiverId] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [chatUsername, setChatUsername] = useState("");
  const [chatUpdateTrigger, setChatUpdateTrigger] = useState(0);

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
