import styled from "styled-components";
import { useEffect, useState } from "react";
import NamebarTop from "./NamebarTop";
import Chatbar from "./Chatbar";
import MessageBubble from "./MessageBubble";
import colors from "../../assets/colors";
import Parse from "parse/dist/parse.min.js";

const ChatComponent = ({ selectedChat }) => {
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    const getChat = async () => {
      const selectedMessages = selectedChat.chat.get("Messages");

      try {
        if (
          selectedMessages === null ||
          selectedMessages === undefined ||
          selectedMessages === 0
        ) {
          alert("No messages in chat");
          return;
        }

        const resolvedMessages = await Promise.all(
          selectedMessages.map(async (selectedMessage) => {
            const message = await selectedMessage.fetch();
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
  }, [selectedChat]);

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
  overflow-y: auto;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
