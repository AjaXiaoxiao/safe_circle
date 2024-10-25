import React, { useState } from 'react';
import './Sidebar.css';

import chatIcon from '../../assets/ChatIcon.png';
import contactIcon from '../../assets/ContactBookIcon.png';
import userIcon from '../../assets/ProfileIcon.png'; 

const Sidebar = () => {
  const [active, setActive] = useState('chat'); // Track active icon

  return (
    <div className="sidebar">
      <ul>
        <li
          className={active === 'chat' ? 'active' : ''}
          onClick={() => setActive('chat')}
        >
          <img src={chatIcon} alt="Chat" className="sidebar-icon" />
        </li>
        <li
          className={active === 'contacts' ? 'active' : ''}
          onClick={() => setActive('contacts')}
        >
          <img src={contactIcon} alt="Contacts" className="sidebar-icon" />
        </li>
        <li
          className={active === 'child-overview' ? 'active' : ''}
          onClick={() => setActive('child-overview')}
        >
          <img src={userIcon} alt="Child Overview" className="sidebar-icon" />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
