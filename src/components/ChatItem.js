import styled from "styled-components";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import colors from "../assets/colors";

const ChatItem = ({ username, message, onChatClick, isSelected }) => {
  const shortMessage =
    message && message.length > 30
      ? message.substring(0, 30) + "..."
      : message || "no messages yet";

  return (
    <Item onClick={onChatClick} isSelected={isSelected}>
      <ProfileContainer>
        <ProfilePictureSmall />
      </ProfileContainer>
      <TextContainer>
        <Name>{username}</Name>
        <MessageText>{shortMessage}</MessageText>
      </TextContainer>
    </Item>
  );
};

export default ChatItem;

const Item = styled.div`
  height: 110px;
  width: 100%;
  background-color: ${(props) =>
    props.isSelected ? colors.yellow : colors.white};
  border-top: 1px solid ${colors.grey};
  border-bottom: 1px solid ${colors.grey};
  display: flex;
  align-items: center;
  cursor: pointer;
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
  font-family: "Barlow", serif;
  font-size: 1.1em;
  font-weight: 500;
`;

const MessageText = styled.p`
  font-size: 0.9em;
`;
