import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import colors from '../../assets/colors'; 

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
  background-color: ${colors.white};
  color: ${colors.black};
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${colors.white};
    background-color: ${colors.hoverRed};
  }
`;
