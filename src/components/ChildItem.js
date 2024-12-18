import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import colors from "../assets/colors";
import StatusIcon from "./Notifications/StatusIcon";

const ChildItem = ({ username, onChildClick, isSelected }) => {
  const [childRequests, setChildRequests] = useState([]);

  useEffect(() => {
    const fetchRequestsForChild = async () => {
        // Step 1: Query the _User table to get the child object by username
        const userQuery = new Parse.Query("UserProfile");
        userQuery.equalTo("username", username);
        console.log("username", username);
        const child = await userQuery.first();
        console.log("child", child);

        if (child) {
          const userPointer = child.get("userPointer"); // gets the pointer to the _User  object from the UserProfile
          const requestQuery = new Parse.Query("Requests");
          requestQuery.equalTo("Child", userPointer); //  Requests has pointer to _User called Child
          const childRequests = await requestQuery.find();

          setChildRequests(childRequests);
        } else {
          console.log("User Profile not found.");
          throw new Error(`No user found with username: ${username}`);
        }
    
       
      }
    fetchRequestsForChild();
  }, [username]);

  return (
    <Item onClick={onChildClick} isSelected={isSelected}>
      <ProfileContainer>
        <ProfilePictureSmall />
      </ProfileContainer>
      <TextContainer>
        <Text>{typeof username === "string" ? username : "Invalid Username"}</Text>
        {childRequests.length > 0 && <StatusIcon title="Pending" />}
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
