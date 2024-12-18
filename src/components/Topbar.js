import logo from "../assets/Logo.png";
import React from "react";
import styled from "styled-components";
import colors from '../assets/colors'; 

const Topbar = () => {
  return (
    <StyledTopbar>
      <div className="top-bar">
        <img src={logo} alt="Logo" className="top-bar-logo" />
      </div>
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
