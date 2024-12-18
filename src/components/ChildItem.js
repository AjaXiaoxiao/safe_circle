import styled from "styled-components";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import colors from "../assets/colors";
import StatusIcon from "./Notifications/StatusIcon";

const ChildItem = ({ username, guardianEmail, requests, onChildClick, isSelected }) => {
  console.log("ChildItem props:", { username, guardianEmail, requests });

  return (
    <Item onClick={onChildClick} isSelected={isSelected}>
      <ProfileContainer>
        <ProfilePictureSmall />
      </ProfileContainer>

      <TextContainer>
        <Text>{typeof username === "string" ? username : "Invalid Username"}</Text>
        <Text>{typeof guardianEmail === "string" ? guardianEmail : "Invalid Email"}</Text>
        {requests.length > 0 ? (
          <RequestsContainer>
            <StatusIcon title="New Contact Request" />
            <RequestsList>
              {requests.map((request, index) => (
                <RequestItem key={index}>
                  {request.get("Status") || "Pending"}
                </RequestItem>
              ))}
            </RequestsList>
          </RequestsContainer>
        ) : (
          <Text>No requests</Text>
        )}
      </TextContainer>
    </Item>
  );
};

export default ChildItem;

const Item = styled.div`
  height: 110px;
  width: 100%;
  background-color: ${({ isSelected }) => (isSelected ? colors.yellow : colors.white)};
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

const Text = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;

const RequestsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const RequestsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-left: 10px;
`;

const RequestItem = styled.li`
  font-size: 0.9em;
  color: ${colors.grey};
`;
