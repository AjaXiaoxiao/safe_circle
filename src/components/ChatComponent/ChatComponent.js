import styled from "styled-components";
import NamebarTop from "./NamebarTop";
import Chatbar from "./Chatbar";
import ChatBubble from "./MessageBubble";

const ChatContainer = styled.div`
  width: 60vw;
  height: 88vh;
  margin-top: 12vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  margin-left: 0;
  background-color: #ebf9fb;
`;

const StyledMessageBubble = styled.div`
  height: 71vh;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10vh;
`;

export default function ChatComponent() {
  return (
    <div>
      <ChatContainer>
        <NamebarTop />
        <StyledMessageBubble>
          <ChatBubble />
        </StyledMessageBubble>
        <Chatbar />
      </ChatContainer>
    </div>
  );
}
