import styled from "styled-components";
import colors from '../../assets/colors'; 

const MessageBubble = ({ message, isSender }) => {
  return (
    <StyledMessageBubble isSender={isSender}>{message}</StyledMessageBubble>
  );
};

export default MessageBubble;


const StyledMessageBubble = styled.div`
  max-width: 400px;
  padding: 10px 15px;
  margin: 10px 20px;
  background-color: ${colors.white};
  color:${colors.black}; 
  border: 2px solid ${(props) => (props.isSender ? colors.purple : colors.yellow)}; /* Purple border for sender, yellow border for receiver */
  border-radius: 10px;
  word-wrap; break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  line-height: 1.5;
  position: relative;
  align-self: ${(props) =>
    props.isSender ? "flex-end" : "flex-start"}; 

  /* Tail styling */
  &::after {
    content: "";
    position: absolute;
    bottom: -15px; 
    ${(props) =>
      props.isSender
        ? "right: 10px;" 
        : "left: 10px;"} 
    width: 0;
    height: 0;
     border-left: ${(props) =>
      props.isSender ? "10px solid transparent" : "none"}; 
    border-right: ${(props) =>
      props.isSender ? "none" : "10px solid transparent"};
    border-top: 15px solid
      ${(props) => (props.isSender ? colors.purple : colors.yellow)};
  }
`;


