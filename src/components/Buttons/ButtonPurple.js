import styled from "styled-components";

const ButtonPurple = () => {
  return <StyledButton type="button">Send request</StyledButton>;
};

export default ButtonPurple;

const StyledButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #bb65ff;
  color: white;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #9e54d9;
  }
`;
