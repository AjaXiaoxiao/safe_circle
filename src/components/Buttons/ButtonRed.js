import styled from "styled-components";

const ButtonRed = () => {
  return <StyledButton type="button">Decline</StyledButton>;
};

export default ButtonRed;

const StyledButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #ff6565;
  color: white;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #e25656;
  }
`;
