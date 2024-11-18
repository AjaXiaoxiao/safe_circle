import styled from "styled-components";
import SideOverviewHeader from "./SideOverviewHeader";
import ContactItem from "./ContactItem";
import Plus from "../assets/Plus.png";
import PopUpAddNewContact from "./PopUps/PopUpAddNewContact";
import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { useLocation } from "react-router-dom";

const SideOverview = ({ title }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility
  const [contacts, setContacts] = useState([]); // State to store contacts
  const location = useLocation();

  const fetchContacts = async () => {
    try {
      const query = new Parse.Query("ContactList"); // Query the ContactList table
      const results = await query.find(); // Fetch all entries
      const fetchedContacts = results.map((contact) => ({
        username: contact.get("username"),
        message: contact.get("message"), // Additional field
      }));
      setContacts(fetchedContacts); // Update state with fetched contacts
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts(); // Fetch contacts when component mounts
  }, []);

  const handleOpenPopup = () => {
    if (location.pathname === "/Contacts") {
      setIsPopupVisible(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleAddContact = async (newContact) => {
    try {
      const Contact = new Parse.Object("ContactList"); // Create a new entry in ContactList
      Contact.set("username", newContact.username);
      Contact.set("about", newContact.about);
      Contact.set("email", newContact.email);
      await Contact.save();

      fetchContacts(); // Refresh the contact list
      setIsPopupVisible(false); // Close the popup
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <OverviewContainer>
      <HeaderContainer>
        <Header>{title}</Header>
        <StyledPlusIcon
          src={Plus}
          alt="Add"
          onClick={handleOpenPopup}
        />
      </HeaderContainer>
      <Separator />
      <ItemContainer>
        {contacts.map((contact, index) => (
          <ContactItem
            key={index}
            username={contact.username}
            message={contact.message}
            showMessage={false} // Messages not shown in contacts view
          />
        ))}
      </ItemContainer>
      <PopUpAddNewContact
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
        onAddContact={handleAddContact}
      />
    </OverviewContainer>
  );
};

export default SideOverview;

// Styled Components
const OverviewContainer = styled.div`
  background-color: #ffffff;
  border: solid #ccc 1px;
  width: 30vw;
  height: 88vh;
  border-top-left-radius: 20px;
  margin-top: 12vh;
  z-index: 2;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.4vw;
`;

const Header = styled.h2`
  font-size: 18px;
  color: #222;
  text-align: left;
  margin: 40px 50px;
`;

const StyledPlusIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 30px;
  margin-right: 10px;
  cursor: pointer;
`;

const Separator = styled.div`
  height: 1px;
  background-color: #ccc;
  width: 99.9%;
`;

const ItemContainer = styled.div`
  height: calc(80vh - 100px);
`;
