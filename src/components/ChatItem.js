import styled from "styled-components";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import colors from "../assets/colors";

const ChatItem = ({ username, message, onChatClick }) => {
  return (
    <Item onClick={onChatClick}>
      <ProfileContainer>
        <ProfilePictureSmall />
      </ProfileContainer>
      <TextContainer>
        <Name>{username}</Name>
        <MessageText>{message || "no messages yet"}</MessageText>
      </TextContainer>
    </Item>
  );
};

export default ChatItem;

const Item = styled.div`
  height: 110px;
  width: 100%;
  background-color: ${colors.white};
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
