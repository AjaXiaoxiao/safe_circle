import logo from '../../assets/Logo.png';
import React from 'react';
import './Topbar.css';  
const Topbar = () => {
    return (
      <div className="top-bar">
        <img src={logo} alt="Logo" className="top-bar-logo" />
      </div>
    );
  };
  
  export default Topbar;