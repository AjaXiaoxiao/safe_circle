import React, { useState} from "react";
import Parse from "parse/dist/parse.min.js";
import styled from "styled-components";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";
import colors from '../../assets/colors'; 

import SmallTextField from "../TextFields/SmallTextField";

const PopUpAddNewContact = ({ isVisible, onClose }) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ username: "", about: "", email: "" });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
  
    try {
      // Get the currently logged-in user
      const currentUser = Parse.User.current();
      if (!currentUser) {
        throw new Error("No user is currently logged in.");
      }
  
      // Fetch the current user's UserProfile
      const ownerUsername = currentUser.get("username");
      const ownerQuery = new Parse.Query("UserProfile");
      const owner = await ownerQuery.equalTo("username", ownerUsername).first();
  
      if (!owner) {
        throw new Error("Owner profile not found for the logged-in user.");
      }
  
      // Check if the UserProfile for the contact exists
      const contactQuery = new Parse.Query("UserProfile");
      const contactUserProfile = await contactQuery.equalTo("username", formData.username).equalTo("email", formData.email).first();

      if (!contactUserProfile) {
        throw new Error("The contact must be a registered user.");
      }

      // Create a new Contact object
      const Contact = Parse.Object.extend("Contact");
      const newContact = new Contact();
      newContact.set("ContactUserProfile", contactUserProfile); // Set pointer to existing UserProfile
      newContact.set("about", formData.about);
      newContact.set("owner", owner); // Set pointer to owner (current user's UserProfile)

  
      // Save the Contact object
      const savedContact = await newContact.save();
      console.log("Contact saved successfully!");
  
      // Fetch or create a ContactList
      const contactListQuery = new Parse.Query("ContactList");
      contactListQuery.equalTo("owner", owner); 
      let contactList = await contactListQuery.first();
  
      if (!contactList) {
        // Create a new ContactList if it doesn't exist
        contactList = new Parse.Object("ContactList");
        contactList.set("Contacts", [savedContact]); 
        contactList.set("owner", owner)
      } else {
        // Append the new contact to the existing ContactList
        const contacts = contactList.get("Contacts") || [];
        contacts.push(savedContact);
        contactList.set("Contacts", contacts);
      }
  
      // Save the ContactList
      await contactList.save();
  
      // Reset form data and fetch updated contacts
      setFormData({ username: "", about: "", email: "" });
    } catch (error) {
      console.error("Error saving contact:", error);
      setError(error.message || "Failed to save contact.");
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (error) {
      setError(null);  // clear the error if the user starts typing
    }
    setFormData({ ...formData, [name]: value });
  };

  if (!isVisible) return null;
  
  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <ProfilePicContainer>
        <ProfilePictureBig />
      </ProfilePicContainer>
      <FormContainer onSubmit={handleFormSubmit}>
        <Label>Name</Label>
        <SmallTextField
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
        />

        <Label>About</Label>
        <SmallTextField
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          placeholder="Say something about"
        />

        <Label>Email</Label>
        <SmallTextField
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
      {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonContainer>
          <Button
            width="fullWidth"
            title="Add new contact"
            type="submit"
            onClick={handleFormSubmit}
          ></Button>
        </ButtonContainer>
      </FormContainer>
    </PopUpContainer>
  );
};

export default PopUpAddNewContact;

const PopUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 450px;
  margin-left: 20%;
  margin-right: 20%;
  background-color: ${colors.white};
  color: ${colors.black};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border: 1px solid ${colors.grey};
`;
const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ProfilePicContainer = styled.div`
  margin-top: 60px;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-items: center;
  margin-top: 30px;
`;

const Label = styled.label`
  font-size: 10px;
  color: ${colors.grey};
  margin-bottom: 0px;
  align-items: left;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const ErrorMessage = styled.div`
  color: ${colors.red};
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
`;

