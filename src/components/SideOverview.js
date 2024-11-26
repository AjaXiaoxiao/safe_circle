import styled from "styled-components";
import SideOverviewHeader from "./SideOverviewHeader";
import PopUpAddNewContact from "./PopUps/PopUpAddNewContact";
import React, { useState } from "react";
import colors from "../assets/colors";
import { useLocation } from "react-router-dom";
import ContactList from "./ContactList";
import ChatList from "./ChatList";

const SideOverview = ({ title, onContactClick, onChatClick }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const location = useLocation();

  const handleOpenPopup = () => {
    if (location.pathname === "/Contacts") {
      setIsPopupVisible(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const isContactList =
    location.pathname === "/Contacts" || location.pathname === "/ChildOverview";

  const isChatList = location.pathname === "/";

  return (
    <OverviewContainer>
      <SideOverviewHeader onAddClick={handleOpenPopup} title={title} />
      {isChatList && <ChatList onChatClick={onChatClick} />}
      {isContactList && <ContactList onContactClick={onContactClick} />}
      {/*If sohuldShowContactList is true then what is on the right side will run */}
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
