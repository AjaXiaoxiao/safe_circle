import styled from "styled-components";

const ButtonPurpleApprove = () => {
  return <StyledButton type="button">Approve</StyledButton>;
};

export default ButtonPurpleApprove;

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