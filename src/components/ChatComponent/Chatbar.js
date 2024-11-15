import TextField from "../TextFields/TextField";
import styled from "styled-components";

import Button from "../Buttons/Button";
import EmojiPickerButton from "../Buttons/EmojiPickerButton";
import { useState } from "react";

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

const Chatbar = () => {
  const [message, setMessage] = useState("");

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  return (
    <StyledChatbar>
      <EmojiPickerButton onSelectEmoji={handleEmojiSelect} />
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button icon="send"/>
    </StyledChatbar>
  );
};

export default Chatbar;
