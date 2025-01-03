import logo from "../assets/Logo.png";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../assets/colors";
import Parse from "parse/dist/parse.min.js";

const Topbar = ({ hideWelcome = false }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const loggedInUser = Parse.User.current();
        if (loggedInUser) {
          const userProfileQuery = new Parse.Query("UserProfile");
          userProfileQuery.equalTo("userPointer", loggedInUser);
          const userProfile = await userProfileQuery.first();
          if (userProfile) {
            setUsername(userProfile.get("username"));
          }
        } else {
          setUsername("");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername("");
      }
    };
    fetchUsername();
  }, []);

  return (
    <StyledTopbar>
      <img src={logo} alt="Logo" className="top-bar-logo" />
      {!hideWelcome && (
        <UsernameDisplay>{username ? `Hi, ${username}!` : " "}</UsernameDisplay>
      )}
    </StyledTopbar>
  );
};

export default Topbar;

const StyledTopbar = styled.div`
  width: 100vw;
  height: 12vh;
  background-color: ${colors.yellow};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  img {
    height: 70px;
    transform: translateY(12px);
  }
`;

const UsernameDisplay = styled.div`
  font-family: "Barlow", serif;
  font-size: 20px;
  font-weight: 400;
  color: ${colors.black};
  margin-right: 20px;
`;
