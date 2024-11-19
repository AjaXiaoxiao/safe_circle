import styled from "styled-components";

const MessageBubble = ({ message, isSender }) => {
  return (
    <StyledMessageBubble isSender={isSender}>{message}</StyledMessageBubble>
  );
};

export default MessageBubble;


const StyledMessageBubble = styled.div`
  width: 400px;
  height: 90px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  margin: 10px;
  background-color: #ffffff;
  color: #000; 
  border: 2px solid ${(props) => (props.isSender ? "#BB65FF" : "#FEE180")}; /* Purple border for sender, yellow border for receiver */
  border-radius: 5px;
  position: relative;
  align-self: ${(props) =>
    props.isSender ? "flex-end" : "flex-start"}; 

  /* Tail styling */
  &::after {
    content: "";
    position: absolute;
    bottom: -15px; /* Position tail below the bubble */
    ${(props) =>
      props.isSender
        ? "right: 15px;" 
        : "left: 15px;"} 
    width: 0;
    height: 0;
     border-left: ${(props) =>
      props.isSender ? "10px solid transparent" : "none"}; 
    border-right: ${(props) =>
      props.isSender ? "none" : "10px solid transparent"};
    border-top: 15px solid
      ${(props) => (props.isSender ? "#BB65FF" : "#FEE180")};
  }
`;
