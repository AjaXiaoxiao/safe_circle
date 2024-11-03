import styled from "styled-components";

const ButtonYellow = () => {
  return <StyledButton type="button">Child account</StyledButton>;
};

export default ButtonYellow;

const StyledButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #fee180;
  color: black;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #ecc544;
  }
`;
