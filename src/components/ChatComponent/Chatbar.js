import React from 'react';
import TextField from '../TextFields/TextField';


import SendButton from '../Buttons/SendButton';

const Chatbar = () => {
    return (
      <div className="chatbar">
        
        <TextField/>
        <SendButton/>
      </div>
    );
  };
  
  export default Chatbar;