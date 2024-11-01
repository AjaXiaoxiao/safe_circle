import React from 'react';
import contact from  '../../assets/Contact.png';
import styled from "styled-components";

const StyledNamebarTop = styled.div`
  width: 754px;
  height: 102px; 
  display: flex;
  flex-direction: row ;
  flex-grow: 0 1 0;
  gap: 2em;
  padding-left: 40px;
  justify-self: right;
  border: solid;
  border-color: #C6C6C6;
  fill: #FFFFFF;
  align-items: center;
  justify-content: left;
  font-size: large;
  font-weight: 700;
  background-color: white;
  font-family: Arial, Helvetica, sans-serif

`;

const NamebarTop = () => {
    return (
      <StyledNamebarTop >
        <img src={contact} alt="contact" className="namebar-top-contact"></img>
        <text className="namebar-top-text"> Mom </text>
      </StyledNamebarTop>
    );
  };
  
  export default NamebarTop;