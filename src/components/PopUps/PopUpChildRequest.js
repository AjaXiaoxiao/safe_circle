import React from "react";
import styled from "styled-components";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";
import SmallTextField from "../TextFields/SmallTextField";
import colors from "../../assets/colors";
import { useToast } from "../../contexts/ToastContext";

const PopUpChildRequest = ({ isVisible, onClose, contact }) => {
  const { displayToast } = useToast();

  if (!isVisible || !contact) return null;

  const { child, requests } = contact;

  const updateRequestStatus = async (status) => {
    try {
      const request = requests?.[0];
      if (!request) {
        throw new Error("No request available to update.");
      }

      request.set("Status", status);

      if (status === "Approved" && child) {
        child.set("isVerified", true);
      }

      await request.save();
      if (child) await child.save();

      displayToast("success", `Request has been ${status}.`);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating the request:", error);
      displayToast("error", "An error occurred. Please try again.");
    }
  };

  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <Header>New child request</Header>
      <ProfilePicContainer>
        <ProfilePictureBig />
      </ProfilePicContainer>
      <FormContainer>
        <Label>Name</Label>
        <SmallTextField value={child?.get("username") || "No name"} disabled />
        <Label>Email</Label>
        <SmallTextField value={child?.get("email") || "No email"} disabled />
        {requests?.length > 0 && <Label>Requests: {requests.length}</Label>}
        <ButtonContainer>
          <Button title="Approve" onClick={() => updateRequestStatus("Approved")} />
          <Button title="Decline" color="red" onClick={() => updateRequestStatus("Declined")} />
        </ButtonContainer>
      </FormContainer>
    </PopUpContainer>
  );
};

export default PopUpChildRequest;

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

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.black};
  margin-bottom: 0px;
  text-align: center;
`;

const ProfilePicContainer = styled.div`
  margin-top: 40px;
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
  font-family: "Barlow", serif;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;
