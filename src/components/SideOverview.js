import styled from "styled-components";
import SideOverviewHeader from "./SideOverviewHeader";
import colors from "../assets/colors";
import { useLocation } from "react-router-dom";
import ContactList from "./ContactList";
import ChatList from "./ChatList";
import React, { useState, useEffect } from "react";
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
}) => {
  const [isAddingChat, setIsAddingChat] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const location = useLocation();

  //i let the childoverview page keep the contacts logic until someone starts to work on it.
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
          onContactClick={(contact) => {
            onContactClick(contact);
            setIsAddingChat(false);
          }}
        />
      )}
      {isContactList && <ContactList onContactClick={onContactClick} />}
      {isChildOverview && <ChildrenList onChildClick={onChildClick} />}
     
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
