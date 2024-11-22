import styled from "styled-components";
import colors from '../../assets/colors'; 

const StyledPendingIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.hoverBlue};
  color: ${colors.black};
  width: 80px;
  height: 25px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
`;

const PendingIcon = () => {
  return <StyledPendingIcon>Pending</StyledPendingIcon>;
};

export default PendingIcon;
