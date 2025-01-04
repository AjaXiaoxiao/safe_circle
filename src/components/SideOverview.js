import styled from "styled-components";
import SideOverviewHeader from "./SideOverviewHeader";
import colors from "../assets/colors";
import { useLocation } from "react-router-dom";
import ContactList from "./ContactList";
import ChatList from "./ChatList";
import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import ChildrenList from "./ChildrenList";
import PopUpAddNewContact from "./PopUps/PopUpAddNewContact";
import PopUpContactRequest from "../components/PopUps/PopUpContactRequest";
import PopUpChildOverview from "../components/PopUps/PopUpChildOverview";
import { useChat } from "../contexts/ChatContext";

const SideOverview = ({
  title,
  onContactClick,
  onAddClick,
  setIsAnyPopupVisible,
  handleOpenPopup,
  handleClosePopup,
  selectedContact,
}) => {
  const [isAddingChat, setIsAddingChat] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isContactRequestPopupVisible, setisContactRequestPopupVisible] = useState(false);
  const [isChildApprovalPopupVisible, setisChildApprovalPopupVisible] = useState(false);
  const [contactRequestData, setcontactRequestData] = useState([]);
  const [contactRequestDetails, setcontactRequestDetails] = useState(null);
  const [childApprovalRequests, setchildApprovalRequests] = useState([]);
  const [childApprovalDetails, setchildApprovalDetails] = useState(null);
  const location = useLocation();

  const { setSelectedChat, setCurrentReceiverId } = useChat();

  const isChatList = location.pathname === "/";
  const isContactList = location.pathname === "/ContactsOverview";
  const isChildOverview = location.pathname === "/ChildOverview";

  const isAnyPopupVisible =
  isContactRequestPopupVisible || isChildApprovalPopupVisible;

  const handleAddChatClick = () => {
    if (isChatList) {
      setIsAddingChat(true);
    } else if (isContactList && onAddClick) {
      onAddClick();
    }
  };

  const handleBackClick = () => {
    setIsAddingChat(false);
  };

  const handleChildClick = (child, requests) => {
    const childApprovalRequests = requests.filter(
      (req) => req.get("Type") === "ChildApproval"
    );
    const contactApprovalRequests = requests.filter(
      (req) => req.get("Type") === "ContactApproval"
    );

    if (childApprovalRequests.length > 0) {
      const firstRequest = childApprovalRequests[0];
      const childData = firstRequest.get("child");
      setchildApprovalDetails(childData);
      setchildApprovalRequests(childApprovalRequests);
      setisChildApprovalPopupVisible(true);
    } else if (contactApprovalRequests.length > 0) {
      const firstRequest = contactApprovalRequests[0];
      const requestContact = firstRequest.get("requestContact");

      if (requestContact) {
        const contactUserProfile = requestContact.get("ContactUserProfile");
        setcontactRequestDetails({
          name: contactUserProfile?.get("username") || "Unknown",
          email: contactUserProfile?.get("email") || "Unknown",
          about: requestContact.get("about") || "Unknown",
        });
        setcontactRequestData(contactApprovalRequests);
        setisContactRequestPopupVisible(true);
      }
    }
  };

  const handleModalClose = () => {
    setisContactRequestPopupVisible(false);
    setcontactRequestData([]);
    setcontactRequestDetails(null);
  };

  const handlePopUpClose = () => {
    setisChildApprovalPopupVisible(false);
    setchildApprovalRequests([]);
    setchildApprovalDetails(null);
  };

  //handles contact click when a new chat is added
  const handleContactClick = async (contact) => {
    try {
      const currentUser = Parse.User.current();
      if (!currentUser) throw new Error("User not logged in");

      const senderQuery = new Parse.Query("UserProfile");
      senderQuery.equalTo("userPointer", currentUser);
      const senderProfile = await senderQuery.first();

      if (!senderProfile) throw new Error("Sender profile not found");

      const receiverQuery = new Parse.Query("UserProfile");
      receiverQuery.equalTo("username", contact.username);
      const receiverProfile = await receiverQuery.first();

      if (!receiverProfile) throw new Error("Receiver profile not found");

      // Check or create a new chat
      const chatQuery = new Parse.Query("Chat");
      chatQuery.containsAll("Participants", [senderProfile, receiverProfile]);
      let chat = await chatQuery.first();

      if (!chat) {
        chat = new Parse.Object("Chat");
        chat.set("Participants", [senderProfile, receiverProfile]);
        chat.set("Messages", []);
        await chat.save();
      }

      // Update selectedChat and currentReceiverId
      const newChat = {
        id: chat.id,
        chat,
        username: contact.username,
      };
      setSelectedChat(newChat);

      setCurrentReceiverId(receiverProfile.id);

      setIsAddingChat(false);
    } catch (error) {
      console.error("Error creating or navigating to chat:", error);
    }
  };

  useEffect(() => {
    if (setIsAnyPopupVisible) {
      setIsAnyPopupVisible(isAnyPopupVisible);
    }
  }, [isAnyPopupVisible, setIsAnyPopupVisible]);

  return (
    <OverviewContainer>
      <SideOverviewHeader
        title={isAddingChat ? "New Chat" : title}
        onAddClick={isAddingChat ? handleBackClick : handleAddChatClick}
        isAddingChat={isAddingChat}
      />
      {!isAddingChat && isChatList && <ChatList />}
      {isAddingChat && (
        <ContactList
          onContactClick={(contact) => handleContactClick(contact)}
        />
      )}
      {isContactList && (
        <ContactList
          onContactClick={onContactClick}
          selectedContact={selectedContact}
        />
      )}
      {isChildOverview && (
        <ChildrenList
        onChildClick={(child, childRequests) => handleChildClick(child, childRequests)}
        selectedContact={selectedContact}
/>
      )}

      <PopUpAddNewContact
        onClick={handleOpenPopup}
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
      />
      {isContactRequestPopupVisible && (
        <PopUpContactRequest
          isVisible={isContactRequestPopupVisible}
          onClose={handleModalClose}
          childRequests={contactRequestData}
          name={contactRequestDetails?.name}
          about={contactRequestDetails?.about}
          email={contactRequestDetails?.email}
        />
      )}
      {isChildApprovalPopupVisible && (
        <PopUpChildOverview
          isVisible={isChildApprovalPopupVisible}
          onClose={handlePopUpClose}
          contact={{
            child: childApprovalDetails,
            requests: childApprovalRequests,
          }}
        />
      )}

    </OverviewContainer>
  );
};
export default SideOverview;

const OverviewContainer = styled.div`
  background-color: ${colors.white};
  border: solid ${colors.grey} 1px;
  width: 30vw;
  height: 88vh;
  border-top-left-radius: 20px;
  margin-top: 12vh;
  z-index: 10;
  overflow-y: auto;
`;
