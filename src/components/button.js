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
    props.type === "submit" ? "#BB65FF" : "#ccc"};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.type === "submit" ? "#0056b3" : "#aaa"};
  }
`;
