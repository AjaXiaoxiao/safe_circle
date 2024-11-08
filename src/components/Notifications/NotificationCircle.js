import styled from "styled-components";

const NotificationCircle = ({ count }) => {
  return <Circle>{count}</Circle>;
};

export default NotificationCircle;

const Circle = styled.div`
  background-color: white;
  color: black; /*text color*/
  border: 1px solid black;
  border-radius: 50%; /*makes the border round*/
  width: 24px;
  display: flex;
  align-items: center; /*Vertically center*/
  justify-content: center; /*Horizonally center*/
  font-size: 14px;
  font-weight: bold;
`;
