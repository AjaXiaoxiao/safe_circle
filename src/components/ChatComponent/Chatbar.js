import TextField from "../TextFields/TextField";
import styled from "styled-components";
import Button from "../Buttons/Button";
import EmojiPickerButton from "../Buttons/EmojiPickerButton";
import { useState } from "react";
import Parse from "parse/dist/parse.min.js";

const Chatbar = () => {
  const [message, setMessage] = useState("");

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  async function sendMessage() {
    try {
      //create a new Parse Message Object
      const Message = new Parse.Object("Message");

      //Define the attributes you want for your Object
      Message.set("Text", message);
      Message.set("Timestamp", new Date());

      //Create another instance with a pointer to another object
      const senderQuery = new Parse.Query("UserProfile");
      const sender = await senderQuery.equalTo("username", "Olga").first();

      const receiverQuery = new Parse.Query("UserProfile");
      const receiver = await receiverQuery.equalTo("username", "Thore").first();

      if (!sender || !receiver) {
        alert("Sender or receiver not found. Please check usernames.");
        return;
      }

      Message.set("Sender", sender);
      Message.set("Receiver", receiver);

      const chatQuery = new Parse.Query("Chat");
      chatQuery.equalTo("Participants", sender);
      chatQuery.equalTo("Participants", receiver);

      let Chat = await chatQuery.first();

      //if the a chat between the participants does not exist. Create a new one.
      if (Chat === null || Chat === undefined) {
        Chat = new Parse.Object("Chat");
        Chat.set("Participants", [sender, receiver]);
        Chat.set("Messages", [Message]);
      } else {
        let messages = Chat.get("Messages");
        messages.push(Message);
        Chat.set("Messages", messages);
      }

      await Chat.save();

      await Message.save();

      alert("Message sent and chat updated");
      setMessage("");
    } catch (error) {
      console.log("error", error);
      alert("There was an error sending the message.");
    }
  }
  return (
    <StyledChatbar>
      <EmojiPickerButton onSelectEmoji={handleEmojiSelect} />
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button icon="send" onClick={sendMessage} />
    </StyledChatbar>
  );
};

export default Chatbar;

const StyledChatbar = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  border: solid #ccc 1px;
  fill: #ffffff;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;
