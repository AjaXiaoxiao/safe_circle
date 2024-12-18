import styled from "styled-components";
import SideOverviewHeader from "./SideOverviewHeader";
import colors from "../assets/colors";
import { useLocation } from "react-router-dom";
import ContactList from "./ContactList";
import ChatList from "./ChatList";
import React, { useState} from "react";
import Parse from "parse/dist/parse.min.js";
import ChildrenList from "./ChildrenList";
import PopUpAddNewContact from "./PopUps/PopUpAddNewContact";

const SideOverview = ({
  title,
  onContactClick,
  onChatClick,
  onAddClick,
  onChildClick,
  handleOpenPopup,
  handleClosePopup,
  setSelectedChat,
  selectedChat,
  setCurrentReceiverId,
  selectedContact,
}) => {
  const [isAddingChat, setIsAddingChat] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const location = useLocation();

  const isChatList = location.pathname === "/";
  const isContactList = location.pathname === "/ContactsOverview";
  const isChildOverview = location.pathname === "/ChildOverview";


  const handleAddChatClick = () => {
    if (isChatList) {
      setIsAddingChat(true);
    } else if (isContactList && onAddClick) {
      onAddClick();
    }
  };

  const handleBackClick = () => {
    setIsAddingChat(false);
  };

  const handleContactClick = async (contact) => {
    try {
      const currentUser = Parse.User.current();
      if (!currentUser) throw new Error("User not logged in");
  
      const senderQuery = new Parse.Query("UserProfile");
      senderQuery.equalTo("userPointer", currentUser);
      const senderProfile = await senderQuery.first();
  
      if (!senderProfile) throw new Error("Sender profile not found");
  
      const receiverQuery = new Parse.Query("UserProfile");
      receiverQuery.equalTo("username", contact.username); 
      const receiverProfile = await receiverQuery.first();
      console.log("this is the receiver" + receiverProfile.id)
      if (!receiverProfile) throw new Error("Receiver profile not found");
  
      // Check for existing chat with both participants
      const chatQuery = new Parse.Query("Chat");
      chatQuery.containsAll("Participants", [senderProfile, receiverProfile]);
      let chat = await chatQuery.first();
  
      if (!chat) {
        chat = new Parse.Object("Chat");
        chat.set("Participants", [senderProfile, receiverProfile]); 
        chat.set("Messages", []); // Initialize with empty Messages array
        await chat.save();
      }
  
      const newChat = {
        id: chat.id,
        chat,
        username: contact.username,
      };
  
      setSelectedChat(newChat);
      setIsAddingChat(false);
    } catch (error) {
      console.error("Error creating or navigating to chat:", error);
    }
  };

  return (
    <OverviewContainer>
      <SideOverviewHeader
        title={isAddingChat ? "New Chat" : title}
        onAddClick={isAddingChat ? handleBackClick : handleAddChatClick}
        isAddingChat={isAddingChat}
      />
      {!isAddingChat && isChatList && (
        <ChatList
          onChatClick={onChatClick}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          setCurrentReceiverId={setCurrentReceiverId}
        />
      )}
      {isAddingChat && (
        <ContactList
          onContactClick={(contact) => handleContactClick(contact)}
        />
      )}
      {isContactList && <ContactList 
                        onContactClick={onContactClick} 
                        selectedContact={selectedContact}/>}
      {isChildOverview && <ChildrenList 
                           onChildClick={onChildClick} 
                           selectedContact={selectedContact}/>}
     
      <PopUpAddNewContact
        onClick={handleOpenPopup}
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
      />
    </OverviewContainer>
  );
};
export default SideOverview;

const OverviewContainer = styled.div`
  background-color: ${colors.white};
  border: solid ${colors.grey} 1px;
  width: 30vw;
  height: 88vh;
  border-top-left-radius: 20px;
  margin-top: 12vh;
  z-index: 10;
  overflow-y: auto;
`;
