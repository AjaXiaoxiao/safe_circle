import styled from "styled-components";
import { useEffect, useState } from "react";
import NamebarTop from "./NamebarTop";
import Chatbar from "./Chatbar";
import MessageBubble from "./MessageBubble";
import Parse from "parse/dist/parse.min.js";

const ChatComponent = () => {
  //const messages = [
  //{ id: 1, text: "Hello! How are you?", isSender: false },
  //{ id: 2, text: "I'm fine, thank you!", isSender: true },
  //{ id: 3, text: "See you next week for soccer!", isSender: true },
  //];

  const [messages, setMessage] = useState([]);

  useEffect(() => {
    const getChat = async () => {
      try {
        const chatQuery = new Parse.Query("Chat");
        const currentUser = Parse.User.current();
        //const currentUser = new Parse.Object("UserProfile");
        //currentUser.id = "0IbpR1MVWv";

        if (currentUser === undefined || currentUser === null) {
          alert("No user is currently logged in.");
          return;
        }
        const receiver = new Parse.Object("UserProfile");
        receiver.id = "Fjp85SDapY"; //hardcoded for now
        chatQuery.equalTo("Participants", currentUser);
        chatQuery.equalTo("Participants", receiver);
        //chatQuery.containsAll("Participants", [currentUser, receiver]);

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
  height: 88vh;
  margin-top: 12vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  margin-left: 0;
  background-color: #ebf9fb;
`;

const StyledMessageBubble = styled.div`
  height: 71vh;
  width: auto;
  align-items: flex;
  margin-top: 10vh;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column; /* Ensures messages stack vertically */
  gap: 15px; /* Adds spacing between messages */
`;
