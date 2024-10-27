import styled from "styled-components";

const Circle = styled.div`
  background-color: white;
  color: black; /*text color*/
  border: 1px solid black;
  border-radius: 50%; /*makes the border round*/
  width: 30px;
  display: flex;
  align-items: center; /*Vertically center*/
  justify-content: center; /*Horizonally center*/
  font-size: 14px;
  font-weight: bold;
`;

export default function NotificationCircle({ count }) {
  return <Circle>{count}</Circle>;
}
