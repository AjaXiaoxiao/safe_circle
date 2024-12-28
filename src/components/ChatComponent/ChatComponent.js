import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import NamebarTop from "./NamebarTop";
import Chatbar from "./Chatbar";
import MessageBubble from "./MessageBubble";
import colors from "../../assets/colors";
import Parse from "parse/dist/parse.min.js";
import { useChat } from "../../contexts/ChatContext";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [chatUsername, setChatUsername] = useState("No chat selected");
  const messageListReference = useRef(null);
  const { selectedChat } = useChat();

  const getChat = async () => {
    if (!selectedChat || !selectedChat.id) return;

    try {
      const chatQuery = new Parse.Query("Chat");
      const chat = await chatQuery.get(selectedChat.id);

      const selectedMessages = chat.get("Messages");

      if (!selectedMessages || selectedMessages.length === 0) {
        setMessages([]);
        return;
      }

      const loggedInUser = Parse.User.current();
      const userProfileQuery = new Parse.Query("UserProfile");
      userProfileQuery.equalTo("userPointer", loggedInUser);
      const loggedInUserProfile = await userProfileQuery.first();

      const resolvedMessages = await Promise.all(
        selectedMessages.map(async (selectedMessage) => {
          const message = await selectedMessage.fetch();
          const sender = await message.get("Sender").fetch();

          return {
            id: message.id,
            text: message.get("Text"),
            isSender: sender.id === loggedInUserProfile.id, // Check if the logged-in user sent this message
          };
        })
      );

      setMessages(resolvedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    getChat();

    const interval = setInterval(() => {
      getChat();
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat && selectedChat.username) {
      setChatUsername(selectedChat.username);
    } else {
      setChatUsername("No chat selected");
    }
  }, [selectedChat]);

  useEffect(() => {
    // Scroll to bottom when messages are updated
    if (messageListReference.current) {
      messageListReference.current.scrollTop =
        messageListReference.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom when component mounts
    if (messageListReference.current) {
      messageListReference.current.scrollTop =
        messageListReference.current.scrollHeight;
    }
  }, []);

  return (
    <div>
      <ChatContainer>
        <NamebarTop username={chatUsername} />
        <StyledMessageBubble ref={messageListReference}>
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

// Styled Components
const ChatContainer = styled.div`
  width: 63vw;
  height: 88vh;
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
