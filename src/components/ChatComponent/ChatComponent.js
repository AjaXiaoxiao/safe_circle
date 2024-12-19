import styled from "styled-components";
import { useEffect, useState } from "react";
import NamebarTop from "./NamebarTop";
import Chatbar from "./Chatbar";
import MessageBubble from "./MessageBubble";
import colors from "../../assets/colors";
import Parse from "parse/dist/parse.min.js";

const ChatComponent = ({ selectedChat, currentReceiverId }) => {
  const [messages, setMessage] = useState([]);
  const [chatUsername, setChatUsername] = useState("No chat selected");

  const fetchMessages = async () => {
    if (!selectedChat || !selectedChat.chat) return;

    try {
      const selectedMessages = selectedChat.chat.get("Messages");

      if (!selectedMessages || selectedMessages.length === 0) {
        setMessage([]);
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
            isSender: sender.id === loggedInUserProfile.id, // Check if the message is from the logged-in user
          };
        })
      );

      setMessage(resolvedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedChat]);


  useEffect(() => {
    if (selectedChat && selectedChat.username) {
      setChatUsername(selectedChat.username);
    } else {
      setChatUsername("Unkown User");
    }
  }, [selectedChat]);

  return (
    <div>
      <ChatContainer>
        <NamebarTop username={chatUsername} />
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
        <Chatbar 
        currentReceiverId={currentReceiverId} 
        selectedChat ={selectedChat}/>
      </ChatContainer>
    </div>
  );
};

export default ChatComponent;

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
