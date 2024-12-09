import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import styled from "styled-components";
import chatIcon from "../assets/ChatIcon.png";
import contactIcon from "../assets/ContactBookIcon.png";
import userIcon from "../assets/ProfileIcon.png";


const Sidebar = () => {
  const location = useLocation(); 
  const [active, setActive] = useState(location.pathname); 

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <StyledSidebar>
      <ul>
        <li
          className={active === "/" ? "active" : ""}
        >
          <Link to="/" onClick={() => setActive("/")}>
            <img src={chatIcon} alt="Chat" className="sidebar-icon" />
          </Link>
        </li>
        <li
          className={active === "/Contacts" ? "active" : ""}
        >
          <Link to="/Contacts" onClick={() => setActive("/Contacts")}>
            <img src={contactIcon} alt="Contacts" className="sidebar-icon" />
          </Link>
        </li>
        <li
          className={active === "/ChildOverview" ? "active" : ""}
        >
          <Link to="/ChildOverview" onClick={() => setActive("/ChildOverview")}>
            <img src={userIcon} alt="Child Overview" className="sidebar-icon" />
          </Link>
        </li>
      </ul>
    </StyledSidebar>
  );
};

export default Sidebar;


const StyledSidebar = styled.div`
  width: 12vw;
  height: 88vh;
  background-color: #fee180;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 12vh;
  padding: 60px 0;
  padding-right: 30px;
  z-index: 1;
  margin-right: -2vw;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 30px;
    cursor: pointer;
    position: relative;

    &.active::before {
      content: "";
      position: absolute;
      top: 10px;
      height: 22px;
      width: 4px;
      background-color: #bb65ff;
      border-radius: 4px;
    }
  }

  .sidebar-icon {
    width: 45px;
    height: 45px;
    padding: 10px;
  }
`;

