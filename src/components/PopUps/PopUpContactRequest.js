import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";
import SmallTextField from "../TextFields/SmallTextField";
import { useListReload } from "../../contexts/ListReloadContext";


const PopUpContactRequest = ({ isVisible, onClose, childRequests, about, name, email }) => {
  const { triggerChildrenListReload } = useListReload();

  if (!isVisible) return null;


  const updateChildRequestStatus = async (status) => {
    try {
      const request = childRequests[0]; 
      if (!request) {
        throw new Error("No child request available to update.");
      }
  
      request.set("Status", status);
      await request.save();
  
      if (status === "Approved") {
        const relatedContact = request.get("requestContact"); 
        if (relatedContact) {
          relatedContact.set("isRequest", false); 
          await relatedContact.save(); 
        }
      }
      onClose();
      triggerChildrenListReload();
        } catch (error) {
      console.error("Error updating child request status:", error);
    }
  };

  return (
    <div>
      <PopUpContainer>
        <CloseButton onClick={onClose}>
          <XButton />
        </CloseButton>
        <ContentWrapper>
        <HeaderText>New contact request</HeaderText>
        <ProfilePicContainer>
          <ProfilePictureBig />
        </ProfilePicContainer>
        <FormContainer>
          <Label>Name</Label>
          <SmallTextField value={name}/>
          <Label>About</Label>
          <SmallTextField value={about} />
          <Label>Email</Label>
          <SmallTextField value={email} />
          {childRequests?.length > 0 && <Label>Requests: {childRequests.length}</Label>}
          <ButtonContainer>
            <Button title="Approve" onClick={() => updateChildRequestStatus("Approved")} />
            <Button title="Decline" color="red" onClick={() => updateChildRequestStatus("Declined")} />
          </ButtonContainer>
        </FormContainer>
        </ContentWrapper>
      </PopUpContainer>
    </div>
  );
};

export default PopUpContactRequest;

const HeaderText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.black};
  margin-bottom: 0px;
  text-align: center;
`;

export const PopUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 450px;
  margin-left: 20%;
  background-color: ${colors.white};
  color: ${colors.black};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const ProfilePicContainer = styled.div`
  margin-top: 25px;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 0px;
`;

export const Label = styled.label`
  font-size: 10px;
  color: ${colors.grey};
  margin-bottom: 0px;
  margin-top: 2px;
  align-items: left;
  font-family: "Barlow", serif;
`;

export const ButtonContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
`;

const ContentWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
