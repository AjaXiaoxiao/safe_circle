import styled from "styled-components";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import colors from "../assets/colors";
import StatusIcon from "./Notifications/StatusIcon";

const ChildItem = ({ username, guardianEmail, requests, onChildClick, child, childRequests}) => {
    
    return (
      <Item onClick={onChildClick}>
        <ProfileContainer>
          <ProfilePictureSmall />
        </ProfileContainer>
        <TextContainer>
          <Text>{username}</Text>
          <Text>{guardianEmail}</Text>
          {requests.length > 0 && (
            <StatusIcon
              title="New Contact Request"
            />
          )}
        </TextContainer>
      </Item>
    );
  };
  
  export default ChildItem;

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

const Text = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;
