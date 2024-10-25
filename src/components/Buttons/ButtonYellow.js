import React from "react";
import styled from "styled-components";

const Button = ({ type, text }) => {
  return <StyledButton type={type}>{text}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) =>
    props.type === "submit" ? "#FEE180" : "#ccc"};
  color: black;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${(props) =>
      props.type === "submit" ? "#ECC544" : "#aaa"};
  }
`;
