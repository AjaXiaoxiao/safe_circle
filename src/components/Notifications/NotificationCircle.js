import styled from "styled-components";

const NotificationCircle = ({ count }) => {
  return <Circle>{count}</Circle>;
};

export default NotificationCircle;

const Circle = styled.div`
  background-color: #ffffff;
  color: black;
  border: 1px solid black;
  border-radius: 50%;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;
