import styled from "styled-components";
import XButton from "../Buttons/XButton";
import Button from "../Buttons/Button";
import colors from '../../assets/colors'; 
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";


const SelectContact = ({ isVisible, onClose, contact }) => {
  if (!isVisible) return null;
  

  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <ProfilePicContainer><ProfilePictureBig /></ProfilePicContainer>
      <ContactName>{contact.username}</ContactName> {/* Dynamically show username */}
      <Button title="Chat" />
      <FieldTitle>About</FieldTitle>
      <FieldValue>{contact.about || "No description available"}</FieldValue> {/* Dynamically show 'about' */}
      <FieldTitle>Email</FieldTitle>
      <FieldValue>{contact.email}</FieldValue> {/* Dynamically show email */}
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
  background-color: ${colors.white};
  color:${colors.black};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  z-index: 1000;
  border: 1px solid ${colors.grey};
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ProfilePicContainer = styled.div`
  margin-top: 6px;
  margin-bottom: 20px;
`;

const ContactName = styled.h2`
  font-weight: bold;
  color: ${colors.black};
`;

const FieldTitle = styled.p`
  font-size: 10px;
  color: ${colors.grey};
  margin-bottom: 0px;
`;

const FieldValue = styled.p`
 font-size: 12px;
  color: ${colors.black};
  margin-top: 0;  
  margin-bottom: 15px;
`;
