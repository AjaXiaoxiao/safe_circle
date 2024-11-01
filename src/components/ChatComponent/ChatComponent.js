import styled from "styled-components";
import NamebarTop from "./NamebarTop";
import Chatbar from "./Chatbar";
import ChatBubble from "./MessageBubble";

const ChatContainer = styled.div`
  width: calc(100vw-120px);
  height: 685px;
  margin-left: auto;
  margin-top: 94px;
  display: flex;
  flex-direction: column;
`;

const Spacer = styled.div`
  height: 40vh;
`;

export default function ChatComponent() {
  return (
    <ChatContainer>
      <NamebarTop />
      <Spacer />
      <ChatBubble />
      <Spacer />
      <Chatbar />
    </ChatContainer>
  );
}
