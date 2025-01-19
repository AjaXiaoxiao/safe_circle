import styled from "styled-components";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SideOverviewHeader from "./SideOverviewHeader";
import colors from "../assets/colors";
import ContactList from "./ContactList";
import ChatList from "./ChatList";
import ChildrenList from "./ChildrenList";
import PopUpAddNewContact from "./PopUps/PopUpAddNewContact";
import PopUpContactRequest from "../components/PopUps/PopUpContactRequest";
import PopUpChildRequest from "./PopUps/PopUpChildRequest";
import PopUpSelectContact from "./PopUps/PopUpSelectContact";
import { usePopUpManager } from "./Hooks/usePopUpManager";
import { useChat } from "../contexts/ChatContext";
import Parse from "parse/dist/parse.min.js";

const SideOverview = ({ title, setIsAnyPopupVisible }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const { setSelectedChat, setCurrentReceiverId } = useChat();

  const {
    // popup states
    isAddNewContactPopupVisible,
    isContactRequestPopupVisible,
    isChildApprovalPopupVisible,
    isSelectContactPopupVisible,
    selectedContact,
    contactRequestData,
    contactRequestDetails,
    childApprovalRequests,
    childApprovalDetails,

    // popup handlers
    handleContactClick,
    handleChildClick,
    handleAddContactClick,
    closeAllPopups,
  } = usePopUpManager(pathname, setIsAnyPopupVisible);

  const [isAddingChat, setIsAddingChat] = useState(false);

  const isChatList = pathname === "/";
  const isContactList = pathname === "/ContactsOverview";
  const isChildOverview = pathname === "/ChildOverview";

  //This one
  const handleAddChatClick = () => {
    if (isChatList) {
      setIsAddingChat(true);
    } else if (isContactList) {
      handleAddContactClick();
    }
  };

  const handleBackClick = () => {
    setIsAddingChat(false);
  };

  //Contact is the contact selected for the chat
  const handleNewChatContactClick = async (contact) => {
    try {
      //Finds the logged in user
      const currentUser = Parse.User.current();
      if (!currentUser) throw new Error("User not logged in");

      //Finds the logged in user in UserProfile
      const senderQuery = new Parse.Query("UserProfile");
      senderQuery.equalTo("userPointer", currentUser);
      const senderProfile = await senderQuery.first();

      if (!senderProfile) throw new Error("Sender profile not found");

      //Finds the contact username
      const receiverQuery = new Parse.Query("UserProfile");
      receiverQuery.equalTo("username", contact.username);
      const receiverProfile = await receiverQuery.first();

      if (!receiverProfile) throw new Error("Receiver profile not found");

      // check or create a new chat
      const chatQuery = new Parse.Query("Chat");
      chatQuery.containsAll("Participants", [senderProfile, receiverProfile]);
      let chat = await chatQuery.first();

      //If there is no chat between the sender and receiver
      if (!chat) {
        chat = new Parse.Object("Chat");
        chat.set("Participants", [senderProfile, receiverProfile]);
        chat.set("Messages", []);
        await chat.save();
      }

      // update selectedChat and currentReceiverId
      //I think this is a way to encapsulate username for instance so that it is displayed
      //in each chat item for instance.
      const newChat = {
        id: chat.id,
        chat,
        username: contact.username,
      };
      setSelectedChat(newChat);
      setCurrentReceiverId(receiverProfile.id);

      setIsAddingChat(false);
      //the error is in this case handled by being displayed in the console like an error
      //"Error creating or navigating to chat: Error: Sender profile not found" for instance"
    } catch (error) {
      console.error("Error creating or navigating to chat:", error);
    }
  };

  return (
    <OverviewContainer>
      <SideOverviewHeader
        title={isAddingChat ? "New Chat" : title}
        onAddClick={isAddingChat ? handleBackClick : handleAddChatClick}
        isAddingChat={isAddingChat}
      />
      {!isAddingChat && isChatList && <ChatList />}
      {isAddingChat && (
        <ContactList onContactClick={handleNewChatContactClick} />
      )}
      {isContactList && (
        <ContactList
          onContactClick={handleContactClick}
          selectedContact={selectedContact}
        />
      )}
      {isChildOverview && (
        <ChildrenList
          onChildClick={(child, requests) => handleChildClick(child, requests)}
          selectedContact={selectedContact}
        />
      )}
      {isAddNewContactPopupVisible && (
        <PopUpAddNewContact
          isVisible={isAddNewContactPopupVisible}
          onClose={closeAllPopups}
        />
      )}
      {isContactRequestPopupVisible && (
        <PopUpContactRequest
          isVisible={isContactRequestPopupVisible}
          onClose={closeAllPopups}
          childRequests={contactRequestData}
          name={contactRequestDetails?.name}
          about={contactRequestDetails?.about}
          email={contactRequestDetails?.email}
        />
      )}
      {isChildApprovalPopupVisible && (
        <PopUpChildRequest
          isVisible={isChildApprovalPopupVisible}
          onClose={closeAllPopups}
          contact={{
            child: childApprovalDetails,
            requests: childApprovalRequests,
          }}
        />
      )}
      {isSelectContactPopupVisible && (
        <PopUpSelectContact
          isVisible={isSelectContactPopupVisible}
          onClose={closeAllPopups}
          contact={selectedContact}
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
