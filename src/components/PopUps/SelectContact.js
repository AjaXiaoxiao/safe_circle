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
      <ButtonPurple text="Chat" />
      <AboutText>About</AboutText>
      <DescriptionText>Guardian*</DescriptionText>
      <DescriptionText>MY MOMMMM xD</DescriptionText>
      <Spacer />
      <EmailText>Email</EmailText>
      <EmailValue>mom@gmail.com</EmailValue>
    </PopUpContainer>
  );
};

export default SelectContact;

const PopUpContainer = styled.div`
  position: fixed;
  top: 20%; /* Adjust this value to move it vertically */
  right: 30px; /* Set right distance from the right edge */
  width: 700px; /* Increase width */
  height: 500px; /* Increase height */
  background-color: white;
  color: black;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items to the start vertically */
  z-index: 1000; /* Ensures the popup is on top */
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ContactIcon = styled.img`
  width: 100px; /* Adjust size as needed */
  height: 100px; /* Adjust size as needed */
  margin-bottom: 10px; /* Space below the icon */
`;

const ContactName = styled.h2`
  font-weight: bold;
  color: black;
  margin: 10px 0; /* Space above and below the name */
`;

const AboutText = styled.p`
  color: grey;
  margin: 5px 0; /* Space around about text */
`;

const DescriptionText = styled.p`
  color: black;
  margin: 5px 0; /* Space around description text */
`;

const Spacer = styled.div`
  margin: 15px 0; /* Space between sections */
`;

const EmailText = styled.p`
  color: grey;
  margin: 5px 0; /* Space around email label */
`;

const EmailValue = styled.p`
  color: black;
  margin: 5px 0; /* Space around email value */
`;
