import React from 'react'; 
import styled from "styled-components";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";
import SmallTextField from "../TextFields/SmallTextField";
import colors from '../../assets/colors'; 

const PopUpChildOverview= ({ isVisible, onClose, contact }) => {
  if (!isVisible || !contact) return null; 

  return (
    <div>
      <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <ProfilePicContainer>
        <ProfilePictureBig />
      </ProfilePicContainer>
      <FormContainer>
        <Label>Name</Label>
        <SmallTextField placeholder="Name of contact" />
        <Label>Email</Label>
        <SmallTextField placeholder="This is their email" />
        <ButtonContainer>
          <Button title="Approve"/>
          <Button title="Decline" color="red"/>
        </ButtonContainer>
      </FormContainer>
      </PopUpContainer>
    </div>
  );
}

export default PopUpChildOverview;

const PopUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 450px;
  margin-left: 20%;
  background-color: ${colors.white};
  color: ${colors.black};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
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
  margin-top: 20px;
  display: flex; 
  flex-direction: row;
`;
