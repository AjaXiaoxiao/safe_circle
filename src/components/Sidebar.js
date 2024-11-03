import React, { useState } from "react";
import styled from "styled-components";
import chatIcon from "../assets/ChatIcon.png";
import contactIcon from "../assets/ContactBookIcon.png";
import userIcon from "../assets/ProfileIcon.png";

const StyledSidebar = styled.div`
  width: 11vw;
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
  margin-right: -1vw;

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

const Sidebar = () => {
  const [active, setActive] = useState("chat");

  return (
    <StyledSidebar>
      <ul>
        <li
          className={active === "chat" ? "active" : ""}
          onClick={() => setActive("chat")}
        >
          <img src={chatIcon} alt="Chat" className="sidebar-icon" />
        </li>
        <li
          className={active === "contacts" ? "active" : ""}
          onClick={() => setActive("contacts")}
        >
          <img src={contactIcon} alt="Contacts" className="sidebar-icon" />
        </li>
        <li
          className={active === "child-overview" ? "active" : ""}
          onClick={() => setActive("child-overview")}
        >
          <img src={userIcon} alt="Child Overview" className="sidebar-icon" />
        </li>
      </ul>
    </StyledSidebar>
  );
};

export default Sidebar;
