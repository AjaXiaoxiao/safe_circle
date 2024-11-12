import TextField from "../TextFields/TextField";
import styled from "styled-components";
import SendButton from "../Buttons/SendButton";
import EmojiButton from "../Buttons/EmojiButton";
import { useState } from "react";
import Parse from "parse";

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

  const sendMessage = async () => {
    const Message = Parse.Object.extend("Message");
    const messageObject = new Message();

    const senderQuery = new Parse.Query(Parse._User);
    senderQuery.equalTo("username", "Chloe");

    const receiverQuery = new Parse.Query(Parse._User);
    receiverQuery.equalTo("username", "Aja");

    try {
      const sender = await senderQuery.first();
      const receiver = await receiverQuery.first();
      alert(JSON.stringify(sender));
      alert(JSON.stringify(receiver));

      if (!sender || !receiver) {
        throw new Error("Sender or receiver not found");
      }

      messageObject.set("Text", message);
      messageObject.set("Sender", sender);
      messageObject.set("Receiver", receiver);
      messageObject.set("Timestamp", new Date());

      await messageObject.save();
      alert("Message sent");
      setMessage("");
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <StyledChatbar>
      <EmojiButton onSelectEmoji={handleEmojiSelect} />
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
      <SendButton onClick={sendMessage} />
    </StyledChatbar>
  );
};

export default Chatbar;
