import TextField from "../TextFields/TextField";
import styled from "styled-components";

import SendButton from "../Buttons/SendButton";
import EmojiButton from "../Buttons/EmojiButton";
import { useState } from "react";

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

  return (
    <StyledChatbar>
      <EmojiButton onSelectEmoji={handleEmojiSelect} />
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
      <SendButton />
    </StyledChatbar>
  );
};

export default Chatbar;
