import styled from "styled-components";
import XButton from "../Buttons/XButton";
import Contact from "../../assets/Contact.png";
import ButtonPurple from "../Buttons/ButtonPurple";

const SelectContact = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  

  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <ContactIcon src={Contact} alt="Contact Icon" />
      <ContactName>Mom</ContactName>
      <ButtonPurple title="Chat" />
      <FieldTitle>About</FieldTitle>
      <FieldValue>Guardian*</FieldValue>
      <FieldValue>MY MOMMMM xD</FieldValue>
      <Spacer />
      <FieldTitle>Email</FieldTitle>
      <FieldValue>mom@gmail.com</FieldValue>
    </PopUpContainer>
  );
};

export default SelectContact;

const PopUpContainer = styled.div`
  position: fixed;
  top: 20%; 
  right: 150px; 
  width: 500px;
  height: 500px;
  background-color: white;
  color: black;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  z-index: 2; 
  border: 1px solid #ccc;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ContactIcon = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 20px; 
`;

const ContactName = styled.h2`
  font-weight: bold;
  color: black;
  margin: 5px 0; 
`;

const FieldTitle = styled.p`
  color: grey;
  margin: 5px 0; 
`;

const Spacer = styled.div`
  margin: 10px 0; 
`;

const FieldValue = styled.p`
  color: black;
  margin: 5px 0; 
`;
