import styled from "styled-components";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import ButtonPurple from "../Buttons/ButtonPurple";
import SmallTextField from "../TextFields/SmallTextField";

const PopUpAddNewContact = ({ isVisible, onClose }) => {
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
        <SmallTextField placeholder="Type something" />
        <Label>About</Label>
        <SmallTextField placeholder="Type something" />
        <Label>Email</Label>
        <SmallTextField placeholder="Type something" />
        <ButtonContainer>
          <ButtonPurple>Send request</ButtonPurple>
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
  background-color: white;
  color: black;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensures the popup is on top */
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
  color: #888;
  margin-bottom: 0px;
  align-items: left;
`;

const ButtonContainer = styled.div`
  margin-top: 20px; /* Adjust this value to move the button down */
`;