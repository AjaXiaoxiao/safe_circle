import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import ContactItem from "./ContactItem";
import { useContact } from "../contexts/ContactContext";
import colors from "../assets/colors";
import styled from "styled-components";

const ContactList = ({ onContactClick, selectedContact }) => {
  const { reloadContactList } = useContact();
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const showMessage = location.pathname === "/";

  const fetchContacts = async () => {
    try {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        //Error like this is typically shown in the Developers tool
        throw new Error("No user is currently logged in.");
      }

      const ownerQuery = new Parse.Query("UserProfile");
      ownerQuery.equalTo("userPointer", currentUser);
      const owner = await ownerQuery.first();

      if (!owner) {
        throw new Error("No logged-in user.");
      }

      const contactListQuery = new Parse.Query("ContactList");
      //The owner of the contact list is a pointer to UserProfile.
      contactListQuery.equalTo("owner", owner);
      //Find the first Contact List that matches the owner.
      const contactList = await contactListQuery.first();

      if (contactList) {
        //Contacts is an array of all contacts in the contactList
        const contactPointers = contactList.get("Contacts") || [];

        const fetchedContacts = await Promise.all(
          //Check through each contact pointer pointing to contact
          contactPointers.map(async (contactPointer) => {
            //fetch() fetches the full object that the contactpointer is poitning towareds
            //Which is in Contacts
            const contact = await contactPointer.fetch();
            //Fetches the data in the ContactUserProfile in Contact table
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

        //A contact of a specific user can show up multiple times, since one contact can have different owners.
        //I think this one is not neccessary, because it is not possible to add a contact you have already added.
        //contact is the contact, index is the current index in fetchedContacts
        //self is the array itself
        //if index does not match the index found through findIndex
        //we know that there are duplicates and this duplicate should be removed
        const uniqueContacts = fetchedContacts.filter(
          (contact, index, self) =>
            index === self.findIndex((c) => c.username === contact.username)
        );

        setContacts(uniqueContacts);
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
