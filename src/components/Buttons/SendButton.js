import SendIcon from "../../assets/Send.png";
import styled from "styled-components";

const StyledSendButton = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SendButton = () => {
  return (
    <StyledSendButton>
      <img alt="send" src={SendIcon} />
    </StyledSendButton>
  );
};

export default SendButton;
