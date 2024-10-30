import React from 'react';
import TextField from '../TextFields/TextField';
import styled from "styled-components";

import SendButton from '../Buttons/SendButton';
import EmojiButton from '../Buttons/EmojiButton';
import { useState} from 'react';

const StyledChatbar = styled.div`
  width: 754px;
  height: 73px; 
  display: flex;
  flex-direction: row ;
  flex-grow: 0 1 0;
  justify-self: right;
  border: solid;
  border-color: #C6C6C6;
  fill: #FFFFFF;
  align-items: center;
  justify-content: center;
`;

const Chatbar = () => {

  const [message, setMessage] = useState("");

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

    return (
      <StyledChatbar>
        <EmojiButton onSelectEmoji={handleEmojiSelect}/>
        <TextField value={message}
        onChange={(e) => setMessage(e.target.value)}/>
        <SendButton/>
      </StyledChatbar>
    );
  };
  
  export default Chatbar;