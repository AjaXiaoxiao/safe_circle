import styled from "styled-components";

const ButtonBlue = ({ title, onClick }) => {
  return <StyledButton onClick={onClick}>{title}</StyledButton>;
};

export default ButtonBlue;

const StyledButton = styled.button`
  margin: 10px;
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #A9E7EB;
  color: black;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #A4E1E5;
  }
`;
