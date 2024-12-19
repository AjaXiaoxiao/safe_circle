import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Buttons/Button";
import EmojiPickerButton from "../Buttons/EmojiPickerButton";
import TextField from "../TextFields/TextField";
import Parse from "parse/dist/parse.min.js";
import colors from "../../assets/colors";

const Chatbar = ({ selectedChat }) => {
  const [message, setMessage] = useState("");

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const sendMessage = async () => {
    if (!selectedChat || !selectedChat.chat) {
      alert("No chat selected!");
      return;
    }

    try {
      const loggedInUser = Parse.User.current();
      if (!loggedInUser) {
        alert("No user logged in");
        return;
      }

      const senderQuery = new Parse.Query("UserProfile");
      senderQuery.equalTo("userPointer", loggedInUser);
      const senderProfile = await senderQuery.first();

      if (!senderProfile) {
        alert("Sender profile not found");
        return;
      }

      // Get the receiver from the selected chat
      const receiverProfile = selectedChat.chat
        .get("Participants")
        .find((participant) => participant.id !== senderProfile.id);

      if (!receiverProfile) {
        alert("Receiver not found");
        return;
      }

      // Create the message
      const Message = new Parse.Object("Message");
      Message.set("Text", message);
      Message.set("Timestamp", new Date());
      Message.set("Sender", senderProfile);
      Message.set("Receiver", receiverProfile);

      // Save the message in the chat
      const chat = selectedChat.chat;
      const messages = chat.get("Messages") || [];
      messages.push(Message);
      chat.set("Messages", messages);

      await Message.save();
      await chat.save();

      setMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send the message");
    }
  };

  return (
    <StyledChatbar>
      <EmojiPickerButton onSelectEmoji={handleEmojiSelect} />
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button icon="send" color="white" onClick={sendMessage} />
    </StyledChatbar>
  );
};

export default Chatbar;

const StyledChatbar = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  border: solid ${colors.grey} 1px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`;
