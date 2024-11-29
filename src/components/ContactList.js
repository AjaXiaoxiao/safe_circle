import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import PendingIcon from "./Notifications/PendingIcon";
import colors from "../assets/colors";

const ContactList = ({ onContactClick, isRequest}) => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const currentUser = Parse.User.current(); //get the current logged in user
        if (!currentUser) {
          throw new Error("No user is currently logged in.");
        }

        //query the logged-in user (owner of the contactlist)
        const ownerUsername = currentUser.get("username");
        const ownerQuery = new Parse.Query("UserProfile");
        const owner = await ownerQuery
          .equalTo("username", ownerUsername)
          .first();

        if (!owner) {
          throw new Error("no logged-in user.");
        }

        //get the ContactList of the logged-in user
        const contactListQuery = new Parse.Query("ContactList");
        contactListQuery.equalTo("owner", owner); // filter by current user/owner
        const contactList = await contactListQuery.first();

        if (contactList) {
          const contactPointers = contactList.get("Contacts") || [];

          // fetch the Contact objects from the current users contactList
          const fetchedContacts = await Promise.all(
            contactPointers.map(async (contactPointer) => {
              //map through each contact and fetch the information
              try {
                const contact = await contactPointer.fetch();
                const contactUserProfile = await contact
                  .get("ContactUserProfile")
                  .fetch();

                return {
                  //return the information about each contact
                  username: contactUserProfile.get("username"),
                  email: contactUserProfile.get("email"),
                  about: contact.get("about"),
                  isRequest: contact.get("isRequest"),
                };
              } catch (error) {
                console.error("Error fetching contact:", error);
                return null;
              }
            })
          );

          // filter out null values in case of errors fetching contacts
          setContacts(fetchedContacts.filter(Boolean));
        } else {
          setContacts([]); // no contacts found set an empty array
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("Failed to fetch contacts.");
      }
    };

    fetchContacts();
  }, []);


  const showMessage = location.pathname === "/";

  return (
    <div>
      {error && <p>{error}</p>}
      {!error && contacts.length === 0 && <p>No contacts found.</p>}
      {!error &&
        contacts.length > 0 &&
        contacts.map((contact, index) => (
          <ContactItem
            key={index}
            username={contact.username}
            message={contact.about}
            showMessage={showMessage}
            isRequest={contact.isRequest} 
            onClick={() => onContactClick(contact)}
          />
        ))}
    </div>
  );
};

export default ContactList;

const ContactItem = ({
  username,
  message,
  showMessage,
  isRequest,
  onClick,
}) => {

  return (
    <>
      <Item onClick={onClick}>
        <ProfileContainer>
          <ProfilePictureSmall />
        </ProfileContainer>
        <TextContainer>
          <Name>{username}</Name>
          {showMessage && (
            <MessageText>{message || "Hello. How are you doing.."}</MessageText>
          )}
          {isRequest && <PendingIcon />}
        </TextContainer>
      </Item>
    </>
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
