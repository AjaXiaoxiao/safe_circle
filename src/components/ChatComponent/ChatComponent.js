import styled from "styled-components";
import NamebarTop from "./NamebarTop";
import Chatbar from "./Chatbar";
import MessageBubble from "./MessageBubble";

const ChatComponent = () => {
  const messages = [
    { id: 1, text: "Hello! How are you?", isSender: false },
    { id: 2, text: "I'm fine, thank you!", isSender: true },
    { id: 3, text: "See you next week for soccer!", isSender: true },
  ];

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