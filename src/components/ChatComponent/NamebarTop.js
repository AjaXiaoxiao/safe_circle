import React from "react";
import contact from "../../assets/Contact.png";
import styled from "styled-components";

const StyledNamebarTop = styled.div`
  width: 895px;
  height: 195px; 
  display: flex;
  flex-direction: row ;
  flex-grow: 0 1 0;
  gap: 2em;
  padding-left: 40px;
  justify-self: right;
  border: solid 2px;
  border-color: #C6C6C6;
  fill: #FFFFFF;
  align-items: center;
  justify-content: left;
  font-size: large;
  font-weight: 700;
  font-family: Arial, Helvetica, sans-serif
  margin-left: auto;

`;

const NamebarTop = () => {
  return (
    <StyledNamebarTop>
      <img src={contact} alt="contact" className="namebar-top-contact"></img>
      <text className="namebar-top-text"> Mom </text>
    </StyledNamebarTop>
  );
};

export default NamebarTop;
