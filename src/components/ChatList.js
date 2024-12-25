import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import colors from "../assets/colors";
import ChatItem from "./ChatItem";
import { useChat } from "../contexts/ChatContext";

const ChatList = ({ onChatClick, displayToast }) => {
  const [chats, setChats] = useState([]);
  const { selectedChat, setSelectedChat, setCurrentReceiverId } = useChat();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        //the logged in user object
        const loggedInUser = Parse.User.current();
        if (!loggedInUser) {
          displayToast("error", "No user is logged in");
          return;
        }

        //find logged in user in the UserProfile table
        const currentUserQuery = new Parse.Query("UserProfile");
        //the userPointer column should contain the logged in user object
        currentUserQuery.equalTo("userPointer", loggedInUser);
        const currentUser = await currentUserQuery.first();

        if (currentUser === undefined || currentUser === null) {
          displayToast("error", "No profile found for the logged-in user.");
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
            const usernameId = otherParticipantProfile.id;
            setCurrentReceiverId(otherParticipant.id);

            //gets the latest message
            let messages = await chat.get("Messages");

            messages = messages || [];

            const resolvedMessages = await Promise.all(
              messages.map(async (messagePointer) => {
                const message = await messagePointer.fetch();
                return message;
              })
            );

            let latestMessage = null;

            if (resolvedMessages.length > 0) {
              latestMessage = resolvedMessages.reduce((latest, current) => {
                if (current.get("Timestamp") > latest.get("Timestamp")) {
                  return current;
                } else {
                  return latest;
                }
              }, resolvedMessages[0]);
            }

            let latestTimestamp = null;
            let messageText = "No messages yet";

            if (latestMessage) {
              latestTimestamp = latestMessage.get("Timestamp");
              messageText = latestMessage.get("Text");
            }

            return {
              id: chat.id,
              username,
              message: messageText,
              latestTimestamp: latestTimestamp,
              chat,
            };
          })
        );

        const sortedChats = chatDetails.sort((a, b) => {
          if (!a.latestTimestamp) return 1; // chats with no messages should be in bottom
          if (!b.latestTimestamp) return -1;
          return b.latestTimestamp - a.latestTimestamp; // sort in descending order yes?
        });

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
            isSelected={selectedChat?.id === chat.id}
          />
        ))
      ) : (
        <NoChatsMessage>No chats available</NoChatsMessage>
      )}
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  padding: 0px;
  overflow-y: auto;
  height: 100%;
`;

const NoChatsMessage = styled.p`
  text-align: center;
  color: ${colors.grey};
`;

export default ChatList;
