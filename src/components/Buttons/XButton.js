import styled from "styled-components";
import { GrClose } from "react-icons/gr";

const XButton = () => {
  return (
    <StyledButton type="button">
      <GrClose />
    </StyledButton>
  );
};

export default XButton;

const StyledButton = styled.button`
  padding: 6px;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  color: black;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: white;
    background-color: #ff6565;
  }
`;
