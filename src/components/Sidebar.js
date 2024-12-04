import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import chatIcon from "../assets/ChatIcon.png";
import contactIcon from "../assets/ContactBookIcon.png";
import userIcon from "../assets/ProfileIcon.png";
import colors from '../assets/colors'; 
import LogOut from "../assets/LogOut.png";
import Parse from "parse/dist/parse.min.js";


const Sidebar = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname); 

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const doUserLogOut = async () => {
    try {
      await Parse.User.logOut(); 
      const currentUser = await Parse.User.currentAsync(); 
      if (!currentUser) {
        alert("Success! You are now logged out.");
        navigate("/userlogin"); 
      }
    } catch (error) {
      alert(`Error during logout: ${error.message}`);
    }
  };

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
          className={active === "/ContactsOverview" ? "active" : ""}
        >
          <Link to="/ContactsOverview" onClick={() => setActive("/ContactsOverview")}>
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
      <LogOutContainer onClick={doUserLogOut}>
        <img src={LogOut} alt="Log Out" className="logout-icon" />
      </LogOutContainer>
    </StyledSidebar>
  );
};

export default Sidebar;


const StyledSidebar = styled.div`
  width: 12vw;
  height: 88vh;
  background-color: ${colors.yellow};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 12vh;
  padding: 60px 0;
  padding-right: 30px;
  z-index: 0;
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
      background-color: ${colors.purple};
      border-radius: 4px;
    }
  }

  .sidebar-icon {
    width: 45px;
    height: 45px;
    padding: 10px;
  }
`;

const LogOutContainer = styled.div`
  margin-top: 35vh; 
  margin-bottom: 20px;
  cursor: pointer;

  .logout-icon {
    width: 45px;
    height: 45px;
    padding: 10px;
  }
`;