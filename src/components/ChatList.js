import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import colors from "../assets/colors";
import ChatItem from "./ChatItem";

const ChatList = ({ onChatClick }) => {
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const loggedInUser = Parse.User.current();
        if (!loggedInUser) {
          alert("No user is logged in");
          return;
        }

        const currentUserQuery = new Parse.Query("UserProfile");
        currentUserQuery.equalTo("userPointer", loggedInUser);
        const currentUser = await currentUserQuery.first();

        if (currentUser === undefined || currentUser === null) {
          alert("No profile found for the logged-in user.");
          return;
        }

        const chatQuery = new Parse.Query("Chat");
        chatQuery.containsAll("Participants", [currentUser]);
        const chats = await chatQuery.find();
        console.log(chats);

        setChats(chats);
      } catch (error) {
        console.error("Error fetching existing chats", error);
      }
    };

    const fetchContacts = async () => {
      try {
        const currentUser = Parse.User.current(); //get the current logged in user
        if (!currentUser) {
          throw new Error("No user is currently logged in.");
        }

        //query the logged-in user (owner of the contactlist)
        const ownerUsername = currentUser.get("username");
        const ownerQuery = new Parse.Query("UserProfile");
        const owner = await ownerQuery
          .equalTo("username", ownerUsername)
          .first();

        if (!owner) {
          throw new Error("no logged-in user.");
        }

        //get the ContactList of the logged-in user
        const contactListQuery = new Parse.Query("ContactList");
        contactListQuery.equalTo("owner", owner); // filter by current user/owner
        const contactList = await contactListQuery.first();

        if (contactList) {
          const contactPointers = contactList.get("Contacts") || [];

          // fetch the Contact objects from the current users contactList
          const fetchedContacts = await Promise.all(
            contactPointers.map(async (contactPointer) => {
              //map through each contact and fetch the information
              try {
                const contact = await contactPointer.fetch();
                const contactUserProfile = await contact
                  .get("ContactUserProfile")
                  .fetch();

                return {
                  //return the information about each contact
                  username: contactUserProfile.get("username"),
                  email: contactUserProfile.get("email"),
                  about: contact.get("about"),
                };
              } catch (error) {
                console.error("Error fetching contact:", error);
                return null;
              }
            })
          );

          // filter out null values in case of errors fetching contacts
          setContacts(fetchedContacts.filter(Boolean));
        } else {
          setContacts([]); // no contacts found set an empty array
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchChats();
    fetchContacts();
  }, []);

  const filteredChats = contacts.filter((contact) => {
    return chats.some((chat) => {
      const participants = chat.get("Participants");
      return participants.some(
        (participant) => participant.get("username") === contact.username
      );
    });
  });

  return (
    <ChatListContainer>
      {filteredChats.length > 0 ? (
        filteredChats.map((contact) => (
          <ChatItem
            key={contact.id}
            contact={contact}
            onClick={() => onChatClick(contact)}
          />
        ))
      ) : (
        <NoChatsMessage>No chats available</NoChatsMessage>
      )}
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  padding: 10px;
  overflow-y: auto;
  height: 100%;
`;

const NoChatsMessage = styled.p`
  text-align: center;
  color: ${colors.grey};
`;

export default ChatList;
