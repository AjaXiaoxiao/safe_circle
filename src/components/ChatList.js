import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import colors from "../assets/colors";
import ChatItem from "./ChatItem";
import { useChat } from "../contexts/ChatContext";
import { useListReload } from "../contexts/ListReloadContext";
import { useToast } from "../contexts/ToastContext";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const {
    selectedChat,
    setSelectedChat,
    setCurrentReceiverId,
    handleChatClick,
  } = useChat();
  const { displayToast } = useToast();
  const { triggerChatListReload } = useListReload();


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const loggedInUser = Parse.User.current();
        if (!loggedInUser) {
          displayToast("error", "No user is logged in");
          return;
        }

        const currentUserQuery = new Parse.Query("UserProfile");
        currentUserQuery.equalTo("userPointer", loggedInUser);
        const currentUser = await currentUserQuery.first();

        if (!currentUser) {
          displayToast("error", "No profile found for the logged-in user.");
          return;
        }

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

            //finds username of the other participant
            const otherParticipantProfile = await otherParticipant.fetch();
            const username = otherParticipantProfile.get("username");
            const usernameId = otherParticipantProfile.id;
            setCurrentReceiverId(otherParticipant.id);

            let messages = chat.get("Messages") || [];
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

            let latestTimestamp;
            if (latestMessage) {
              latestTimestamp = latestMessage.get("Timestamp");
            } else {
              latestTimestamp = chat.createdAt;
            }

            let messageText;
            if (latestMessage) {
              messageText = latestMessage.get("Text");
            } else {
              messageText = "No messages yet";
            }

            return {
              id: chat.id,
              username,
              message: messageText,
              latestTimestamp,
              chat,
            };
          })
        );

        // sorting chats, latestTimestamp
        const sortedChats = chatDetails.sort(
          (a, b) => b.latestTimestamp - a.latestTimestamp
        );

        setChats(sortedChats);
        if (fetchedChats.length > 0 && !selectedChat) {
          setSelectedChat(chatDetails[0]);
        }
      } catch (error) {
        console.error("Error fetching existing chats", error);
      }
    };

    fetchChats();
  }, [setSelectedChat, triggerChatListReload]);

  return (
    <ChatListContainer>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <ChatItem
            key={chat.id}
            username={chat.username}
            message={chat.message}
            messages={chat.messages}
            onChatClick={() => handleChatClick(chat)}
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
  font-family: "Barlow", serif;
`;

export default ChatList;
