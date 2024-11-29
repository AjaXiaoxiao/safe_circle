import styled from "styled-components";
import SideOverviewHeader from "./SideOverviewHeader";
import PopUpAddNewContact from "./PopUps/PopUpAddNewContact";
import React, { useState, useEffect } from "react";
import colors from "../assets/colors";
import { useLocation } from "react-router-dom";
import ContactList from "./ContactList";
import ChatList from "./ChatList";
import Parse from "parse/dist/parse.min.js";


const SideOverview = ({ title, onContactClick }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const location = useLocation();
  const [requests, setRequests] = useState([]);

  const handleOpenPopup = () => {
    if (location.pathname === "/Contacts") {
      setIsPopupVisible(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  //i let the childoverview page keep the contacts logic until someone starts to work on it.
  const isContactList =
    location.pathname === "/Contacts" || location.pathname === "/ChildOverview";

  const isChatList = location.pathname === "/";

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

  return (
    <OverviewContainer>
      <SideOverviewHeader onAddClick={handleOpenPopup} title={title} />
      {isChatList && <ChatList />}
      {isContactList && <ContactList onContactClick={onContactClick} />}
      {/*If sohuldShowContactList is true then what is on the right side will run */}
      <PopUpAddNewContact
        onClick={handleOpenPopup}
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
      />
      <ul>
        {requests.map((req) => (
          <li key={req.id} onClick={() => onContactClick(req)}>
            {req.get("Description")}
          </li>
        ))}
      </ul>
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
  z-index: 2;
  overflow-y: auto;
`;
