import React from "react";
import {
  PopUpContainer,
  CloseButton,
  ProfilePicContainer,
  FormContainer,
  ButtonContainer,
  Label,
} from "./PopUpStyling.sc.js";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";
import SmallTextField from "../TextFields/SmallTextField";

const PopUpContactRequest = ({ isVisible, onClose, childRequests, about, name, email, refreshChildRequests }) => {
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
  
      if (refreshChildRequests) {
        refreshChildRequests();
      }
  
      onClose();
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
        <ProfilePicContainer>
          <ProfilePictureBig />
        </ProfilePicContainer>
        <FormContainer>
          <Label>Name</Label>
          <SmallTextField value={name} readOnly />
          <Label>About</Label>
          <SmallTextField value={about} readOnly />
          <Label>Email</Label>
          <SmallTextField value={email} readOnly />
          <ButtonContainer>
            <Button title="Approve" onClick={() => updateChildRequestStatus("Approved")} />
            <Button title="Decline" color="red" onClick={() => updateChildRequestStatus("Declined")} />
          </ButtonContainer>
        </FormContainer>
      </PopUpContainer>
    </div>
  );
};

export default PopUpContactRequest;
