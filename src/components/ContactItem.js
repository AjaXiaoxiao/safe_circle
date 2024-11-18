import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";


const ContactList = () => {
  const [usernames, setUsernames] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const objectIds = ["ZoNoB0alGr", "91hDGAsB50"];
        const query = new Parse.Query(Parse.User);
        query.containedIn("objectId", objectIds); 
        const results = await query.find();
        const fetchedUsernames = results.map((userProfile) =>
          userProfile.get("username")
        );
        setUsernames(fetchedUsernames);
      } catch (error) {
        console.error("Error fetching usernames:", error);
        setError("Failed to fetch usernames. Please try again later.");
      }
    };

    fetchUsernames();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {usernames.length > 0 ? (
        usernames.map((username, index) => (
          <ContactItem key={index} username={username} />
        ))
      ) : (
        <p>Loading contacts...</p>
    )}
    </div>
  );
};

export default ContactList;

const ContactItem = ({ username }) => {
  return (
    <Item>
      <ProfileContainer>
        <ProfilePictureSmall />
      </ProfileContainer>
      <TextContainer>
        <Name>{username}</Name>
        <MessageText>Hello. How are you doing..</MessageText>
      </TextContainer>
    </Item>
  );
};

const Item = styled.div`
  height: 110px;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
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
  font-size: 1.4em;
  font-weight: bold;
`;

const MessageText = styled.p`
  font-size: 0.9em;
`;

