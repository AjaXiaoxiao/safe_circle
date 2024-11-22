import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import PendingIcon from "./Notifications/PendingIcon";
import colors from '../assets/colors'; 

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const query = new Parse.Query("ContactList"); 
        const results = await query.find();
        const fetchedContacts = results.map((contact) => ({
          username: contact.get("username"),
        }));
        setContacts(fetchedContacts); 
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("Failed to fetch contact.");
      }
    };

    fetchContacts();
  }, []);

  const showMessage = location.pathname === "/"; 
  const isRequest = location.pathname === "/ChildOverview";

  return (
    <div>
    {!error && contacts.length === 0 && <p>Loading...</p>}
    {!error &&
      contacts.length > 0 &&
      contacts.map((contact, index) => (
        <ContactItem
          key={index}
          username={contact.username}
          message={contact.message}
          showMessage={showMessage}
          isRequest={isRequest}
         
        />
      ))}
    </div>
  );
};

export default ContactList;


const ContactItem = ({ username, message, showMessage, isRequest }) => {
  return (
    <Item>
      <ProfileContainer>
        <ProfilePictureSmall />
      </ProfileContainer>
      <TextContainer>
        <Name>{username}</Name>
        {showMessage && <MessageText>{message || "Hello. How are you doing.."}</MessageText>}
        {isRequest &&  <PendingIcon/>}
      </TextContainer>
    </Item>
  );
};

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
