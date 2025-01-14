import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import colors from "../assets/colors";
import ChatItem from "./ChatItem";
import { useChat } from "../contexts/ChatContext";
import { useToast } from "../contexts/ToastContext";

//This is a functional component
const ChatList = () => {
  const [chats, setChats] = useState([]);
  const {
    selectedChat,
    setSelectedChat,
    setCurrentReceiverId,
    chatUpdateTrigger,
    handleChatClick,
  } = useChat();
  const { displayToast } = useToast();

  useEffect(() => {
    //fetchChats is an async function
    const fetchChats = async () => {
      try {
        const loggedInUser = Parse.User.current();
        if (!loggedInUser) {
          displayToast("error", "No user is logged in");
          return;
        }

        //Parse.Query defines a query that is used to fetch Parse.Objects
        const currentUserQuery = new Parse.Query("UserProfile");
        //Adds a constraint to the query that requires a particular key's value to be equal to the provided value.
        //in our case the userPointer field should have the value of loggedInUser
        currentUserQuery.equalTo("userPointer", loggedInUser);
        const currentUser = await currentUserQuery.first();

        //currentUser is used in Boolean context and will be false if it is null or undefined
        if (!currentUser) {
          displayToast("error", "No profile found for the logged-in user.");
          return;
        }

        const chatQuery = new Parse.Query("Chat");
        //finds all rows where the current user is part of the Participants array
        chatQuery.containsAll("Participants", [currentUser]);
        //find finds all the rows where currentUser is in the Particpants field.
        //we do not want the program to move un until the fetchedChats have been fetched.
        const fetchedChats = await chatQuery.find();

        //stores the receiver profiles in the otherParticipant variable
        //Promise.all lets us run all promises in parallell
        //.map iterates over each chat
        //.get() and .find() also looks at the objects we have already fetched
        const chatDetails = await Promise.all(
          fetchedChats.map(async (chat) => {
            const participants = chat.get("Participants");
            const otherParticipant = participants.find(
              (participant) => participant.id !== currentUser.id
            );

            //finds username of the other participant
            //otherParticipantProfile is a pointer to UserProfile.
            //we use .fetch() to fetch all the information in there instead
            const otherParticipantProfile = await otherParticipant.fetch();
            const username = otherParticipantProfile.get("username");
            const usernameId = otherParticipantProfile.id;
            //not sure if this is neccessary, since we only want to set the currentReceiver id of the top chat or selected chat
            setCurrentReceiverId(otherParticipant.id);

            let messages = chat.get("Messages") || [];
            const resolvedMessages = await Promise.all(
              messages.map(async (messagePointer) => {
                const message = await messagePointer.fetch();
                return message;
              })
            );

            let latestMessage = null;
            //finds the latest message
            if (resolvedMessages.length > 0) {
              //takes two arguments: 1: an anonymous arrow function with two arguments. The first argument is the accumulated value, and current is the one we iterating over right now.
              //2: the initial value that the accumulator should start as.
              latestMessage = resolvedMessages.reduce((latest, current) => {
                //if timestamp from current is greater (more recent) than latest return current
                if (current.get("Timestamp") > latest.get("Timestamp")) {
                  return current;
                } else {
                  return latest;
                }
              }, resolvedMessages[0]);
            }
            //latestMessage ends up being the most recent message

            let latestTimestamp;
            if (latestMessage) {
              latestTimestamp = latestMessage.get("Timestamp");
              //if there is no latest message in the chat then just base set the
              //timestamp to when the chat was created
            } else {
              latestTimestamp = chat.createdAt;
            }

            let messageText;
            if (latestMessage) {
              messageText = latestMessage.get("Text");
            } else {
              messageText = "No messages yet";
            }
            //returns an array of objects containing these qualities.
            return {
              id: chat.id,
              username,
              message: messageText,
              latestTimestamp,
              chat,
            };
          })
        );

        // Sorting chats, latestTimestamp
        //if the result is positive b is greater than a and should come before a
        //and the other way around for negative.
        const sortedChats = chatDetails.sort(
          (a, b) => b.latestTimestamp - a.latestTimestamp
        );
        //we set chats here based on the sorted ones. It is chats that are being
        //looped through inside the return block, hence the messages are sorted.
        setChats(sortedChats);
        if (fetchedChats.length > 0 && !selectedChat) {
          //It is fine to use chatDetails here as well because it is sorted by default. We do not copy the array and sort the copied array.
          setSelectedChat(chatDetails[0]);
          //moreover I am thinking that we should have moved setCurrentReceiverId to here and also use the receiver of the chatDetails[0] chat?
        }
      } catch (error) {
        console.error("Error fetching existing chats", error);
      }
    };

    fetchChats();
    //I am pretty sure we can remove setSelectedChat from the dependency array.
  }, [setSelectedChat, chatUpdateTrigger]);

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
            isSelected={selectedChat?.id === chat.id} //called optional chaining, instead of having to first check is selectedChat is defined, we skip that step.
          />
        ))
      ) : (
        <NoChatsMessage>No chats available</NoChatsMessage>
      )}
    </ChatListContainer>
  );
};
//overflow-y adds a scrollbar there are more elements than what can fit the screen.
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
