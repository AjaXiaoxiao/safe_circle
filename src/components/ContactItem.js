import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import { useLocation } from "react-router-dom";

const ContactList = () => {
  const [contacts, setContacts] = useState([]); // Store contacts from ContactList table
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const query = new Parse.Query("ContactList"); // Query the ContactList table
        const results = await query.find(); // Fetch all entries
        const fetchedContacts = results.map((contact) => ({
          username: contact.get("username"), // Adjust field names as per your table structure
          message: contact.get("message"), // Example additional field
        }));
        setContacts(fetchedContacts); // Update state with fetched contacts
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("Failed to fetch contacts. Please try again later.");
      }
    };

    fetchContacts();
  }, []);

  const showMessage = location.pathname === "/";

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <ContactItem
            key={index}
            username={contact.username}
            message={contact.message}
            showMessage={showMessage}
          />
        ))
      ) : (
        <p>Loading contacts...</p>
      )}
    </div>
  );
};

export default ContactList;

const ContactItem = ({ username, message, showMessage }) => {
  return (
    <Item>
      <ProfileContainer>
        <ProfilePictureSmall />
      </ProfileContainer>
      <TextContainer>
        <Name>{username}</Name>
        {showMessage && <MessageText>{message || "No message available"}</MessageText>}
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
  font-size: 1.2em;
  font-weight: bold;
`;

const MessageText = styled.p`
  font-size: 0.9em;
`;
