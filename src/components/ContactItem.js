import React from "react";
import styled from "styled-components";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import StatusIcon from "./Notifications/StatusIcon";
import colors from "../assets/colors";

const ContactItem = ({ username, message, showMessage, isRequest, onClick, isSelected }) => {
  return (
    <Item onClick={onClick} isSelected={isSelected}>
      <ProfileContainer>
        <ProfilePictureSmall />
      </ProfileContainer>
      <TextContainer>
        <Name>{username}</Name>
        {showMessage && <MessageText>{message}</MessageText>}
        {isRequest && <StatusIcon title={"Pending"} />}
      </TextContainer>
    </Item>
  );
};

export default ContactItem;

const Item = styled.div`
  height: 110px;
  width: 100%;
  background-color: ${props => (props.isSelected ? colors.yellow : colors.white)};
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

const Name = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;

const MessageText = styled.p`
  font-size: 0.9em;
`;
