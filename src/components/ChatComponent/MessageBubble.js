import styled from "styled-components";

const StyledMessageBubble = styled.div`
  width: 400px;
  height: 110px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  margin: 10px;
  background-color: #ffffff;
  color: #000; /* Black text color */
  border: 2px solid ${(props) => (props.isSender ? "#FEE180" : "#BB65FF")}; /* Purple border for receiver, yellow border for sender */
  border-radius: 5px;
  position: relative;
  align-self: ${(props) =>
    props.isSender ? "flex-end" : "flex-start"}; /* Align based on sender */

  /* Tail styling */
  &::after {
    content: "";
    position: absolute;
    bottom: -15px; /* Position it below the bubble */
    ${(props) =>
      props.isSender
        ? "left: 15px;"
        : "right: 15px;"} /* Left for receiver, right for sender */
    width: 0;
    height: 0;
    border-left: ${(props) =>
      props.isSender ? "10px solid transparent" : "none"}; /* Sender tail */
    border-right: ${(props) =>
      props.isSender ? "none" : "10px solid transparent"}; /* Receiver tail */
    border-top: 15px solid
      ${(props) => (props.isSender ? "#FEE180" : "#BB65FF")}; /* Tail color matches border */
  }
`;

const MessageBubble = ({ message, isSender }) => {
  return (
    <StyledMessageBubble isSender={isSender}>{message}</StyledMessageBubble>
  );
};

export default MessageBubble;
