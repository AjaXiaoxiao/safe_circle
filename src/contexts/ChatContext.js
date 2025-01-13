//createContext enables you to create a context where as useContext allows you to create the custom hook that makes sure that other compnents can access the useContext created
import React, { createContext, useContext, useState } from "react";
//ensures that I can work with the Parse functions
import Parse from "parse/dist/parse.min.js";

//Creates the context that will hold the data we going to pass around in the application
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
        //.find loops through an array
        .find((participant) => participant.id !== currentUser.id);
      if (receiver) {
        setCurrentReceiverId(receiver.id);
      }
    }
  };

  const resetChat = () => {
    setSelectedChat(null);
  };

  //The context provider provides all the components the values that is inside.
  //The outer curly braces are showing it is an object, the inner one is for passing expressions (such as variables, functions or objects)
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
        resetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

//creates a custom hook
//useContext allows me to access the ChatContext, and I tell useContext that it is ChatContext it should use
export const useChat = () => {
  return useContext(ChatContext);
};
