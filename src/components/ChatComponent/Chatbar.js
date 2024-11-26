import TextField from "../TextFields/TextField";
import styled from "styled-components";
import Button from "../Buttons/Button";
import EmojiPickerButton from "../Buttons/EmojiPickerButton";
import { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import colors from "../../assets/colors";

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
      const loggedInUser = Parse.User.current();

      if (loggedInUser === null || loggedInUser === undefined) {
        alert("No user is currently logged in. So there is no sender");
        return;
      }
      const currentUser = new Parse.Query("UserProfile");
      //const currentUser = Parse.User.current();

      const sender = await currentUser
        .equalTo("userPointer", loggedInUser)
        .first();

      if (sender === null || sender === undefined) {
        alert("The sender profile does not exist");
        return;
      }
      const receiverQuery = new Parse.Query("UserProfile");
      const receiver = await receiverQuery.equalTo("username", "Arwen").first(); //hard coded for now

      if (receiver === null || receiver === undefined) {
        alert("The receiver profile does not exist");
        return;
      }

      Message.set("Sender", sender);
      Message.set("Receiver", receiver);

      const chatQuery = new Parse.Query("Chat");
      chatQuery.containsAll("Participants", [sender, receiver]);

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

      await Message.save();
      await Chat.save();

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
  border: solid ${colors.grey} 1px;
  fill: ${colors.white};
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`;
