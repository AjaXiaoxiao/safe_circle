import React from "react";
import styled from "styled-components";

// Input component definition
const Input = () => {
  return (
    <InputWrapper>
      <StyledInput type="text" placeholder="Username" />
    </InputWrapper>
  );
};

export default Input;

// Styled components
const InputWrapper = styled.div`
  display: flex;
`;

const StyledInput = styled.input`
  padding: 10px 20px;
  margin: 20px;
  border-radius: 20px;
  border: 1px solid #ccc;
  width: 100%;
  background-color: #fee180;
`;
