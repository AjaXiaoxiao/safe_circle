import styled from "styled-components";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import SideOverviewHeader from "./SideOverviewHeader";
import React, { useState, useEffect } from "react";

const SideOverview = ({ title, onContactClick, context, clearSelection }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactClick = (contactName) => {
    setSelectedContact(contactName);

    if (context === "Contacts" || context === "ChildOverview") {
      onContactClick(contactName); 
    } else if (context === "Chat") {
      onContactClick(contactName); 
    }
  };

  useEffect(() => {
    if (clearSelection) {
      setSelectedContact(null);
    }
  }, [clearSelection]);

  return (
    <OverviewContainer>
      <SideOverviewHeader title={title} />
      <Separator />
      <ItemContainer>
        <Item
          onClick={() => handleContactClick("Johanna")}
          isSelected={selectedContact === "Johanna"}
        >
          <ProfileContainer>
            <ProfilePictureSmall />
          </ProfileContainer>
          <TextContainer>
            <Name>Johanna</Name>
            <MessageText>Hello. How are you doing..</MessageText>
          </TextContainer>
        </Item>
      </ItemContainer>
    </OverviewContainer>
  );
};

export default SideOverview;

//Container for the overview rectangle
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
  width: 99.9%;
`;

const ItemContainer = styled.div`
  height: calc(80vh - 100px);
`;

const Item = styled.div`
  height: 110px;
  width: 100%;
  background-color: ${({ isSelected }) => (isSelected ? "#fee180" : "#ffffff")};
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-left: 25px;
  margin-top: 10px;
`;

const Name = styled.div`
  font-size: 1.4em;
  font-weight: bold;
`;

const MessageText = styled.p`
  font-size: 0.9em;
`;
