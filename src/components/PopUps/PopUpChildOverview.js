import React from "react";
import styled from "styled-components";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";
import SmallTextField from "../TextFields/SmallTextField";
import colors from "../../assets/colors";
import { useToast } from "../../contexts/ToastContext";
import Parse from "parse/dist/parse.min.js";

const PopUpChildOverview = ({ isVisible, onClose, contact }) => {
  const { displayToast } = useToast();

  if (!isVisible || !contact) return null;

  const { child, requests } = contact;
  console.log("child", child)
 

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

      // getting the parent profile
      const currentUser = Parse.User.current();
      console.log("currentUser", currentUser);
      const userProfileQuery = new Parse.Query("UserProfile");
      userProfileQuery.equalTo("userPointer", currentUser);
      const owner = await userProfileQuery.first();

      // get contact list for this parent
      const contactListQuery = new Parse.Query("ContactList");
      contactListQuery.equalTo("owner", owner);
      const contactList = await contactListQuery.first();

      // creating a contact for the child
      const Contact = Parse.Object.extend("Contact");
      const newContact = new Contact();
      newContact.set("ContactUserProfile", child);
      newContact.set("owner", owner);
      const savedContact = await newContact.save();

      // add the contact to the parent's contact List
      if (!contactList) {
        const newContactList = new Parse.Object("ContactList");
        newContactList.set("Contacts", [savedContact]);
        newContactList.set("owner", owner);
        await newContactList.save();
      } else {
        contactList.addUnique("Contacts", savedContact);
        await contactList.save();
      }

      // // getting the child profile  
      const childProfile = await child.fetch();
      console.log("childProfile", child);

      const userProfileQueryChild = new Parse.Query("UserProfile");
      userProfileQueryChild.equalTo("userPointer", childProfile);
      const childOwner = await userProfileQueryChild.first();
      console.log("childOwner", childOwner);

      // get contact list for this child
      const contactListQueryChild = new Parse.Query("ContactList");
      contactListQueryChild.equalTo("owner", childOwner);
      const contactListChild = await contactListQueryChild.first();

      // creating a contact of the parent for the child
      const ContactChild = Parse.Object.extend("Contact");
      const newContactChild = new ContactChild();
      newContactChild.set("ContactUserProfile", owner);
      newContactChild.set("owner", childOwner);
      const savedContactChild = await newContactChild.save();

      // add the contact to the child's contact List
      if (!contactListChild) {
        const newContactListChild = new Parse.Object("ContactList");
        newContactListChild.set("Contacts", [savedContactChild]);
        newContactListChild.set("owner", childOwner);
        await newContactListChild.save();
      } else {
        contactListChild.addUnique("Contacts", savedContactChild);
        await contactListChild.save();
      }

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
          <Button
            title="Approve"
            onClick={() => updateRequestStatus("Approved")}
          />
          <Button
            title="Decline"
            color="red"
            onClick={() => updateRequestStatus("Declined")}
          />
        </ButtonContainer>
      </FormContainer>
    </PopUpContainer>
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
