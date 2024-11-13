import TextField from "../TextFields/TextField";
import styled from "styled-components";
import SendButton from "../Buttons/SendButton";
import EmojiButton from "../Buttons/EmojiButton";
import { useState } from "react";
import Parse from "parse/dist/parse.min.js";

const StyledChatbar = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  border: solid 2px;
  border-color: #c6c6c6;
  fill: #ffffff;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

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
      const senderQuery = new Parse.Query("Person");
      const sender = await senderQuery.equalTo("name", "Johnnyyy").first();

      //const receiverQuery = new Parse.Query("Person");
      //const receiver = await receiverQuery.equalTo("name", "Johnnyyy").first();

      //if (!sender || !receiver) {
      //alert("Sender or receiver not found. Please check usernames.");
      //return;
      //}

      //Message.set("Sender", sender);
      //Message.set("Receiver", receiver);

      await Message.save();
      alert("Message sent");
      setMessage("");
    } catch (error) {
      console.log("error", error);
      alert("There was an error sending the message.");
    }
  }
  return (
    <StyledChatbar>
      <EmojiButton onSelectEmoji={handleEmojiSelect} />
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
      <SendButton onClick={sendMessage} />
    </StyledChatbar>
  );
};

export default Chatbar;
