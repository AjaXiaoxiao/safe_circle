import styled from "styled-components";
import XButton from "../Buttons/XButton";
import colors from "../../assets/colors";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";

const PopUpSelectContact = ({ isVisible, onClose, contact }) => {
  if (!isVisible) return null;

  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <ProfilePicContainer>
        <ProfilePictureBig />
      </ProfilePicContainer>
      <ContactName>{contact.username}</ContactName>
      <FieldTitle>About</FieldTitle>
      <FieldValue>{contact.about || "No description available"}</FieldValue>
      <FieldTitle>Email</FieldTitle>
      <FieldValue>{contact.email}</FieldValue>
    </PopUpContainer>
  );
};

export default PopUpSelectContact;

const PopUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 450px;
  background-color: ${colors.white};
  color: ${colors.black};
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
  font-family: "Barlow", serif;
  font-size: 20px;
  font-weight: 550;
  margin-bottom: 20px;
  color: ${colors.black};
`;

const FieldTitle = styled.p`
  font-size: 12px;
  color: ${colors.grey};
  margin-bottom: 0px;
`;

const FieldValue = styled.p`
  font-size: 15px;
  color: ${colors.black};
  margin-top: 0;
  margin-bottom: 15px;
`;
