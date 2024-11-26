import styled from "styled-components";
import { useEffect, useState } from "react";
import NamebarTop from "./NamebarTop";
import Chatbar from "./Chatbar";
import MessageBubble from "./MessageBubble";
import colors from "../../assets/colors";
import Parse from "parse/dist/parse.min.js";

const ChatComponent = () => {
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    const getChat = async () => {
      try {
        const loggedInUser = Parse.User.current();
        if (loggedInUser === undefined || loggedInUser === null) {
          alert("No user is currently logged in.");
          return;
        }

        const currentUserQuery = new Parse.Query("UserProfile");
        currentUserQuery.equalTo("userPointer", loggedInUser);
        const currentUser = await currentUserQuery.first();

        if (currentUser === undefined || currentUser === null) {
          alert("No profile found for the logged-in user.");
          return;
        }

        const receiverQuery = new Parse.Query("UserProfile");
        receiverQuery.equalTo("objectId", "XlP96B3nm1");
        const receiver = await receiverQuery.first();

        if (receiver === undefined || receiver === null) {
          alert("Receiver profile not found.");
          return;
        }

        const chatQuery = new Parse.Query("Chat");
        chatQuery.containsAll("Participants", [currentUser, receiver]);

        //currentUser.id = "VhLZw2iLDh"; //hard coded for now - Legolas
        //currentUser.userPointer = loggedInUser;
        //receiver.id = "XlP96B3nm1"; //hardcoded for now - ARWEN
        //chatQuery.equalTo("Participants", currentUser);
        //chatQuery.equalTo("Participants", receiver);

        const chat = await chatQuery.first();

        if (chat === undefined || chat === null) {
          alert("No chat found");
          return;
        }

        const messagesPointers = chat.get("Messages");
        if (
          messagesPointers === null ||
          messagesPointers === undefined ||
          messagesPointers.length === 0
        ) {
          alert("No messages in chat");
          return;
        }

        const resolvedMessages = await Promise.all(
          messagesPointers.map(async (messagePointer) => {
            const message = await messagePointer.fetch();
            return {
              id: message.id, //this is how you get the defualt objectId with Parse
              text: message.get("Text"),
              isSender: message.get("Sender").id === Parse.User.current().id,
            };
          })
        );
        setMessage(resolvedMessages);
      } catch (error) {
        console.error("Error fetching chat or messages:", error);
      }
    };
    getChat();
  }, []);

  return (
    <div>
      <ChatContainer>
        <NamebarTop />
        <StyledMessageBubble>
          <MessageList>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg.text}
                isSender={msg.isSender}
              />
            ))}
          </MessageList>
        </StyledMessageBubble>
        <Chatbar />
      </ChatContainer>
    </div>
  );
};

export default ChatComponent;

const ChatContainer = styled.div`
  width: 60vw;
  height: 96vh;
  margin-top: 12vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  margin-left: 0;
  background-color: ${colors.backgroundBlue};
`;

const StyledMessageBubble = styled.div`
  height: 71vh;
  width: auto;
  align-items: flex;
  margin-top: 10vh;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
