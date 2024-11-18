import React, { useState } from "react";
import styled from "styled-components";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";
import SmallTextField from "../TextFields/SmallTextField";

const PopUpAddNewContact = ({ isVisible, onClose, onAddContact }) => {
  const [formData, setFormData] = useState({
    username: "",
    about: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.username.trim()) {
      onAddContact(formData); // Pass form data to parent handler
      setFormData({ username: "", about: "", email: "" }); // Reset form
      onClose(); // Close the popup
    } else {
      alert("Username is required!");
    }
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
      <FormContainer>
        <Label>Name</Label>
        <SmallTextField
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />
        <Label>About</Label>
        <SmallTextField
          name="about"
          placeholder="Enter about info"
          value={formData.about}
          onChange={handleChange}
        />
        <Label>Email</Label>
        <SmallTextField
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button title="Add new contact" onClick={handleSubmit}></Button>
        </ButtonContainer>
      </FormContainer>
    </PopUpContainer>
  );
};

export default PopUpAddNewContact;

// Styled components
const PopUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 450px;
  background-color: white;
  color: black;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border: 1px solid #ccc;
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
  gap: 10px;
  align-items: center;
  margin-top: 30px;
`;

const Label = styled.label`
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;
