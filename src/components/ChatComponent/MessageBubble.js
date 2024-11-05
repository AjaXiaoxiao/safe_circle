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
  border: 2px solid ${(props) => (props.isSender ? "#BB65FF" : "#FEE180")}; /* Purple border for sender, yellow border for receiver */
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
        ? "right: 15px;" /* Tail on the right for sender */
        : "left: 15px;"} /* Tail on the left for receiver */
    width: 0;
    height: 0;
    border-left: ${(props) =>
      props.isSender ? "none" : "10px solid transparent"}; /* Receiver tail */
    border-right: ${(props) =>
      props.isSender ? "10px solid transparent" : "none"}; /* Sender tail */
    border-top: 15px solid
      ${(props) => (props.isSender ? "#BB65FF" : "#FEE180")}; /* Tail color matches border */
  }
`;

const MessageBubble = ({ message, isSender }) => {
  return (
    <StyledMessageBubble isSender={isSender}>{message}</StyledMessageBubble>
  );
};

export default MessageBubble;
