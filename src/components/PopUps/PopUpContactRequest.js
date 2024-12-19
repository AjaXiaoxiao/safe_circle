import React, { useState} from "react";
import {PopUpContainer, CloseButton, ProfilePicContainer, FormContainer, ButtonContainer, Label } from "./PopUpStyling.sc.js";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";
import SmallTextField from "../TextFields/SmallTextField";

const PopUpContactRequest = ({ isVisible, onClose, contact, childRequests }) => {
    const [showModal, setShowModal] = useState(false);
    if (!isVisible || !contact) return null;
    
  
    const { child} = contact;
  
    // const updateRequestStatus = async (status) => {
    //   try {
    //     const request = requests[0]; 
    //     const childObj = child;
  
    //     request.set("Status", status);
  
    //     if (status === "Approved") {
    //       childObj.set("isVerified", true);
    //     }
  
    //     await request.save();
    //     await childObj.save();
  
    //     console.log("Request and child updated successfully.");
    //     alert(`Request has been ${status}.`);
    //     onClose(); 
    //   } catch (error) {
    //     console.error("Error updating the request:", error);
    //     alert("An error occurred. Please try again.");
    //   }
    // };

    const updateContactStatus = async (status) => {
        try {
            const request = childRequests[0];
            request.set("Status", status);
            await request.save();
         
          // Close modal if no more pending requests
          if (childRequests.length <= 1) setShowModal(false);
        } catch (error) {
          console.error("Error approving request:", error);
        }
      };
  
    const handleApprove = () => updateContactStatus("Approved");
    const handleDecline = () => updateContactStatus("Declined");
  
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
            <SmallTextField value={child.get("username") || "No name"} disabled />
            <Label>About</Label>
            <SmallTextField value={child.get("about") || "No about"} disabled />
            <Label>Email</Label>
            <SmallTextField value={child.get("email") || "No email"} disabled />
            <ButtonContainer>
              <Button title="Approve" onClick={handleApprove}/>
              <Button title="Decline" color="red" onClick={handleDecline} />
            </ButtonContainer>
          </FormContainer>
        </PopUpContainer>
      </div>
    );
  };
  
  export default PopUpContactRequest;
  


  