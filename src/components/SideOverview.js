import styled from "styled-components";
import SideOverviewHeader from "./SideOverviewHeader"
import ContactItem from "./ContactItem";
import Plus from "../assets/Plus.png";
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
      <HeaderContainer>
        <Header>{title}</Header>
        <StyledPlusIcon
          src={Plus} 
          alt="Add"
          onClick={handleOpenPopup} 
        />
      </HeaderContainer>
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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.4vw;
`;

const Header = styled.h2`
  font-size: 22px;
  color: #222;
  text-align: left;
  margin: 40px 50px;
`;

const StyledPlusIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 30px;
  margin-right: 10px;
  cursor: pointer;
`;

const Separator = styled.div`
  height: 1px;
  background-color: #ccc;
  width: 100%;
`;

const ItemContainer = styled.div`
  height: calc(80vs - 100px);
`;
