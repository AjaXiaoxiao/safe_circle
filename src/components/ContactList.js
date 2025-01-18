import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import ContactItem from "./ContactItem";
import { useListReload } from "../contexts/ListReloadContext";
import colors from "../assets/colors";
import styled from "styled-components";

const ContactList = ({ onContactClick, selectedContact }) => {
  const { reloadContactList } = useListReload();

  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const showMessage = location.pathname === "/";

  const fetchContacts = async () => {
    try {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        throw new Error("No user is currently logged in.");
      }

      const ownerQuery = new Parse.Query("UserProfile");
      ownerQuery.equalTo("userPointer", currentUser);
      const owner = await ownerQuery.first();

      if (!owner) {
        throw new Error("No logged-in user.");
      }

      const contactListQuery = new Parse.Query("ContactList");
      contactListQuery.equalTo("owner", owner);
      const contactList = await contactListQuery.first();

      if (contactList) {
        const contactPointers = contactList.get("Contacts") || [];

        const fetchedContacts = await Promise.all(
          contactPointers.map(async (contactPointer) => {
            const contact = await contactPointer.fetch();
            const contactUserProfile = await contact
              .get("ContactUserProfile")
              .fetch();

            return {
              id: contact.id,
              username: contactUserProfile.get("username"),
              email: contactUserProfile.get("email"),
              about: contact.get("about"),
              isRequest: contact.get("isRequest"),
            };
          })
        );

        setContacts(fetchedContacts);
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to fetch contacts.");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [reloadContactList]);

  return (
    <div>
      {error && <p>{error}</p>}
      {!error && contacts.length === 0 && (
        <NoContacts>No contacts found.</NoContacts>
      )}
      {!error &&
        contacts.length > 0 &&
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            username={contact.username}
            message={contact.about}
            showMessage={showMessage}
            isRequest={contact.isRequest}
            isSelected={selectedContact?.id === contact.id}
            onClick={() => onContactClick(contact)}
          />
        ))}
    </div>
  );
};

const NoContacts = styled.p`
  text-align: center;
  color: ${colors.grey};
  font-family: "Barlow", serif;
`;

export default ContactList;
