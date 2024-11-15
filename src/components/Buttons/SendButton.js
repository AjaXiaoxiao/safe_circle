import SendIcon from "../../assets/Send.png";
import styled from "styled-components";

const StyledSendButton = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 16 px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SendButton = ({ onClick }) => {
  return (
    <StyledSendButton onClick={onClick}>
      <img alt="send" src={SendIcon} />
    </StyledSendButton>
  );
};

export default SendButton;
