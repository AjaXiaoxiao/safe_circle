import styled from "styled-components";
import SideOverviewHeader from "./SideOverviewHeader";
import colors from "../assets/colors";
import { useLocation } from "react-router-dom";
import ContactList from "./ContactList";
import ChatList from "./ChatList";
import React, { useState, useEffect } from "react";
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
}) => {
  const [isAddingChat, setIsAddingChat] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const location = useLocation();
  const [requests, setRequests] = useState([]);

  //i let the childoverview page keep the contacts logic until someone starts to work on it.
  const isChatList = location.pathname === "/";
  const isContactList = location.pathname === "/ContactsOverview";
  const isChildOverview = location.pathname === "/ChildOverview";

  useEffect(() => {
    const fetchRequests = async () => {
      if (location.pathname === "/childoverview") {
        const query = new Parse.Query("Requests");
        query.equalTo("Parent", Parse.User.current());
        query.equalTo("Status", "Pending");
        const results = await query.find();
        setRequests(results);
      }
    };

    fetchRequests();
  }, [location.pathname]);

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
      <ul>
        {requests.map((req) => (
          <li key={req.id} onClick={() => onContactClick(req)}>
            {req.get("Description")}
          </li>
        ))}
      </ul>
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
