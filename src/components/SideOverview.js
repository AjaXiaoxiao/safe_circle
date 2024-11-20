import styled from "styled-components";
import SideOverviewHeader from "./SideOverviewHeader"
import ContactItem from "./ContactItem";
import PopUpAddNewContact from "./PopUps/PopUpAddNewContact";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const SideOverview = ({ title }) => {
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

  return (
    <OverviewContainer>
      <SideOverviewHeader/>
      <Separator />
      <ItemContainer>
        <ContactItem />
      </ItemContainer>
      <PopUpAddNewContact isVisible={isPopupVisible} onClose={handleClosePopup} />
    </OverviewContainer>
  );
};
export default SideOverview;

const OverviewContainer = styled.div`
  background-color: #ffffff;
  border: solid #ccc 1px;
  width: 30vw;
  height: 88vh;
  border-top-left-radius: 20px;
  margin-top: 12vh;
  z-index: 2;
`;


const Separator = styled.div`
  height: 1px;
  background-color: #ccc;
  width: 100%;
`;

const ItemContainer = styled.div`
  height: calc(80vs - 100px);
`;
