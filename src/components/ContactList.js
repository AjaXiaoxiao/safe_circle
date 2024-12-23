import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import ContactItem from "./ContactItem";

const ContactList = ({ onContactClick, selectedContact }) => {
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

      const ownerUsername = currentUser.get("username");
      const ownerQuery = new Parse.Query("UserProfile");
      const owner = await ownerQuery.equalTo("username", ownerUsername).first();

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
            try {
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
            } catch (error) {
              console.error("Error fetching contact:", error);
              return null;
            }
          })
        );

        setContacts(fetchedContacts.filter(Boolean));
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
  }, []); 

  return (
    <div>
      {error && <p>{error}</p>}
      {!error && contacts.length === 0 && <p>No contacts found.</p>}
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

export default ContactList;
