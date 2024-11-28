import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import colors from "../assets/colors";
import ChatItem from "./ChatItem";

const ChatList = ({ onChatClick }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        //the logged in user object
        const loggedInUser = Parse.User.current();
        if (!loggedInUser) {
          alert("No user is logged in");
          return;
        }

        //find logged in user in the UserProfile table
        const currentUserQuery = new Parse.Query("UserProfile");
        //the userPointer column should contain the logged in user object
        currentUserQuery.equalTo("userPointer", loggedInUser);
        const currentUser = await currentUserQuery.first();

        if (currentUser === undefined || currentUser === null) {
          alert("No profile found for the logged-in user.");
          return;
        }

        //filter chats that the logged in user is a participant of
        const chatQuery = new Parse.Query("Chat");
        chatQuery.containsAll("Participants", [currentUser]);
        const fetchedChats = await chatQuery.find();

        //stores the receiver profiles in the otherParticipant variable
        const chatDetails = await Promise.all(
          fetchedChats.map(async (chat) => {
            const participants = chat.get("Participants");
            const otherParticipant = participants.find(
              (participant) => participant.id !== currentUser.id
            );

            //finds the username of the other participant
            const otherParticipantProfile = await otherParticipant.fetch();
            const username = otherParticipantProfile.get("username");

            //gets the latest message
            let messages = chat.get("Messages");
            console.log("The lenght is:" + messages.length);

            let latestMessage = null;

            for (const message of messages) {
              if (messages.length === 1) {
                console.log("First message:", messages[0].get("Text"));

                latestMessage = message;
              } else {
                if (
                  !latestMessage ||
                  message.get("Timestamp") > latestMessage.get("Timestamp")
                ) {
                  latestMessage = message;
                }
              }
            }

            console.log(latestMessage);
            return {
              id: chat.id,
              username,
              message: latestMessage.get("Text"),
            };
          })
        );

        setChats(chatDetails);
      } catch (error) {
        console.error("Error fetching existing chats", error);
      }
    };
    fetchChats();
  }, []);

  return (
    <ChatListContainer>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <ChatItem
            username={chat.username}
            message={chat.message}
            onClick={() => onChatClick(chat)}
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
