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

//align-items: aligns the items vertically
//without the display: flex we cannot work with align-items since it is a property of flex.
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

//align-items - we define that the profile container items should be aligned vertically
//margin-left: 20px; - defines that there should be a 20px emtpy space to the left.
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

//flex-direction: column - the elemnts inside Text container are aligned underneath each other in a column
//justify-content: aligns horisontally
//aligns elements to the left
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-left: 25px;
  margin-top: 10px;
`;

//em is more dynamic compared to px since em is a relative measurment in relation to parent.
const Name = styled.div`
  font-family: "Barlow", serif;
  font-size: 1.1em;
  font-weight: 500;
`;

const MessageText = styled.p`
  font-size: 0.9em;
`;
