import React from "react";
import styled from "styled-components";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";
import SmallTextField from "../TextFields/SmallTextField";
import colors from "../../assets/colors";

const PopUpChildOverview = ({ isVisible, onClose, contact }) => {
  if (!isVisible || !contact) return null;

  const { child, requests } = contact;

  // Function to update request status to Parse Backend
  const updateRequestStatus = async (status) => {
    try {
      const request = requests[0]; // Assuming requests[0] is the pending request
      const childObj = child;

      // Update the "Status" field of the request object
      request.set("Status", status);

      // If approving, set the child's "isVerified" field to true
      if (status === "Approved") {
        childObj.set("isVerified", true);
      }

      // Save the request and child objects to Parse
      await request.save();
      await childObj.save();

      console.log("Request and child updated successfully.");
      alert(`Request has been ${status}.`);
      onClose(); // Close the popup
    } catch (error) {
      console.error("Error updating the request:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleApprove = () => updateRequestStatus("Approved");
  const handleDecline = () => updateRequestStatus("Declined");

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
          <Label>Email</Label>
          <SmallTextField value={child.get("email") || "No email"} disabled />
          {requests.length > 0 && (
            <Label>Requests: {requests.length}</Label>
          )}
          <ButtonContainer>
            <Button title="Approve" onClick={handleApprove} />
            <Button title="Decline" color="red" onClick={handleDecline} />
          </ButtonContainer>
        </FormContainer>
      </PopUpContainer>
    </div>
  );
};

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
