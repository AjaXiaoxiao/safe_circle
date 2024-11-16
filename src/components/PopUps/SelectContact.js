import styled from "styled-components";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";

const SelectContact = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  

  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <ProfilePicContainer>
        <ProfilePictureBig />
      </ProfilePicContainer>
      <ContactName>Mom</ContactName>
      <Button title="Chat" />
      <FieldTitle>About</FieldTitle>
      <FieldValue>Guardian*</FieldValue>
      <FieldValue>MY MOMMMM xD</FieldValue>
      <FieldTitle>Email</FieldTitle>
      <FieldValue>mom@gmail.com</FieldValue>
    </PopUpContainer>
  );
};

export default SelectContact;

const PopUpContainer = styled.div`
  position: absolute;
  top: 50%; 
  left: 70%; 
  transform: translate(-50%, -50%);
  width: 340px; 
  height: 450px;
  background-color: #FFF;
  color: #000;
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
  margin-top: 6px;
  margin-bottom: 10px;
`;


const ContactName = styled.h2`
  font-weight: bold;
  color: #000;
`;

const FieldTitle = styled.p`
  font-size: 10px;
  color: #888;
  margin-bottom: 0px;
`;

const FieldValue = styled.p`
 font-size: 12px;
  color: #000;
  margin-top: 0;  
  margin-bottom: 15px;
`;

