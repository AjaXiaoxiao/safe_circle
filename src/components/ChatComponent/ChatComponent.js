import styled from "styled-components";
import NamebarTop from "./NamebarTop";
import Chatbar from "./Chatbar";
import ChatBubble from "./MessageBubble";

const ChatContainer = styled.div`
  width: 60vw;
  height: 88vh;
  margin-top: 12vh;
  margin-left: 0;
  display: grid;
  grid-template-rows: 60px 1fr 80px; /* Define heights for each row */
`;

const StyledMessageBubble = styled.div`
  height: 75%;
  width: 100%;
  display: flex;
  margin-top: 15vh;
  align-items: center;
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
