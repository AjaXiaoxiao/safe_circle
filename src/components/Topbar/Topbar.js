import logo from "../../assets/Logo.png";
import React from "react";
import styled from "styled-components";

const StyledTopbar = styled.div`
  width: 100%;
  height: 12vh;
  background-color: #fee180;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  img {
    height: 70px;
    transform: translateY(12px);
  }
`;

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
