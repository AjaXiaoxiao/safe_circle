import React from "react";
import styled from "styled-components";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import colors from "../assets/colors";
import StatusIcon from "./Notifications/StatusIcon";

const ChildItem = ({ username, onChildClick, isSelected, requests }) => {
  const hasRequests = requests.length > 0;

  return (
    <Item onClick={onChildClick} isSelected={isSelected}>
      <ProfileContainer>
        <ProfilePictureSmall />
      </ProfileContainer>
      <TextContainer>
        <Text>
          {typeof username === "string" ? username : "Invalid Username"}
        </Text>
        {hasRequests && <StatusIcon title="Pending" />}
      </TextContainer>
    </Item>
  );
};

export default ChildItem;

const Item = styled.div`
  height: 110px;
  width: 100%;
  background-color: ${({ isSelected }) =>
    isSelected ? colors.yellow : colors.white};
  border-top: 1px solid ${colors.grey};
  border-bottom: 1px solid ${colors.grey};
  display: flex;
  align-items: center;
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

const Text = styled.div`
  font-family: "Barlow", serif;
  font-weight: 500;
  font-size: 1.2em;
`;
