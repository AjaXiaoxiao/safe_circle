import styled from "styled-components";
import colors from '../../assets/colors'; 

const NotificationCircle = ({ count }) => {
  return <Circle>{count}</Circle>;
};

export default NotificationCircle;

const Circle = styled.div`
  background-color: ${colors.white};
  color: ${colors.black};
  border: 1px solid ${colors.black};
  border-radius: 50%;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;
