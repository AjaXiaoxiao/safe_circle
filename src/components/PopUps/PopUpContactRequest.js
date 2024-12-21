import React from "react";
import {PopUpContainer, CloseButton, ProfilePicContainer, FormContainer, ButtonContainer, Label } from "./PopUpStyling.sc.js";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";
import SmallTextField from "../TextFields/SmallTextField";

const PopUpContactRequest = ({ isVisible, onClose, childRequests, name, email }) => {
    if (!isVisible ) return null;    


    const updateContactStatus = async (status) => {
        try {
            const request = childRequests[0];
            request.set("Status", status);
            await request.save();
         
          // Close modal if no more pending requests
          if (childRequests.length <= 1) onClose();
          window.location.reload();
        } catch (error) {
          console.error("Error approving request:", error);
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
            <SmallTextField value={name}> </SmallTextField>
            <Label>Email</Label>
            <SmallTextField value={email}> </SmallTextField>
            <ButtonContainer>
              <Button title="Approve" onClick={() => updateContactStatus("Approved")} />
              <Button title="Decline" color="red" onClick={() => updateContactStatus("Declined")} />
            </ButtonContainer>
          </FormContainer>
        </PopUpContainer>
      </div>
    );
  };
  
  export default PopUpContactRequest;
  


  