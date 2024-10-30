import React from 'react';
import contact from  '../../assets/Contact.png'

const NamebarTop = () => {
    return (
      <div className="namebar-top">
        <img src={contact} alt="contact" className="namebar-top-contact"></img>
        <text className="namebar-top-text"> Mom </text>
      </div>
    );
  };
  
  export default NamebarTop;