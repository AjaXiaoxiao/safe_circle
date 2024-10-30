import React from 'react';
import TextField from '../TextFields/TextField';
import EmojiButton from '../Buttons/EmojiButton';

import './Chatbar.css';  
import SendButton from '../Buttons/SendButton';

const Chatbar = () => {
    return (
      <div className="chatbar">
        <EmojiButton/>
        <TextField/>
        <SendButton/>
      </div>
    );
  };
  
  export default Chatbar;