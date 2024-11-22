import styled from "styled-components";
import colors from '../../assets/colors'; 

const MessageBubble = ({ message, isSender }) => {
  return (
    <StyledMessageBubble isSender={isSender}>{message}</StyledMessageBubble>
  );
};

export default MessageBubble;


const StyledMessageBubble = styled.div`
  width: 400px;
  height: auto;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  margin: 10px;
  margin-bottom: 30px;
  background-color: ${colors.white};
  color:${colors.black}; 
  border: 2px solid ${(props) => (props.isSender ? colors.purple : colors.yellow)}; /* Purple border for sender, yellow border for receiver */
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
      ${(props) => (props.isSender ? colors.purple : colors.yellow)};
  }
`;


