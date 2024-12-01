import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import colors from "../assets/colors";
import ChatItem from "./ChatItem";

const ChatList = ({ onChatClick, selectedChat, setSelectedChat }) => {
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
            let messages = await chat.get("Messages");

            const resolvedMessages = await Promise.all(
              messages.map(async (messagePointer) => {
                const message = await messagePointer.fetch();
                return message;
              })
            );

            let latestMessage = null;

            if (resolvedMessages.length === 1) {
              latestMessage = resolvedMessages[0];
            } else {
              for (const message of resolvedMessages) {
                if (
                  !latestMessage ||
                  message.get("Timestamp") > latestMessage.get("Timestamp")
                ) {
                  latestMessage = message;
                }
              }
            }

            const messageText = latestMessage.get("Text");

            return {
              id: chat.id,
              username,
              message: messageText,
              messages: resolvedMessages,
              chat,
            };
          })
        );

        setChats(chatDetails);
        if (fetchedChats.length > 0 && !selectedChat) {
          setSelectedChat(chatDetails[0]);
        }
      } catch (error) {
        console.error("Error fetching existing chats", error);
      }
    };
    fetchChats();
  }, [setSelectedChat]);

  return (
    <ChatListContainer>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <ChatItem
            key={chat.id}
            username={chat.username}
            message={chat.message}
            messages={chat.messages}
            onChatClick={() => onChatClick(chat)}
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
