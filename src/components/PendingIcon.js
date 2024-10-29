import React from "react";
import styled from "styled-components";

const StyledPendingIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #A9E7EB; 
  color: #000; 
  width: 80px; 
  height: 25px;
  border-radius: 15px; /* Rounds the corners */
  font-size: 12px; 
  font-weight: bold; 
`;

const PendingIcon = () => {
  return (
    <StyledPendingIcon>Pending</StyledPendingIcon>
  );
};

export default PendingIcon;
