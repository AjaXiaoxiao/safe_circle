import styled from "styled-components";
import XButton from "../Buttons/XButton";

const PopUpSignedIn = ({ isVisible, onClose, username, isChild, isVerified }) => {
    if (!isVisible) return null;

    const message = isChild
    ? isVerified
      ? `You are now ready to use SafeCircle!`
      : `Now you just have to wait for your guardian to approve your profile. We will let you know when you can start using SafeCircle.`
    : `You are now ready to use SafeCircle!`;

  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <h2>Welcome {username}!</h2>
      <p>{message}</p>
    </PopUpContainer>
  );
};

export default PopUpSignedIn;

const PopUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 450px;
  margin-left: 20%;
  background-color: #ffffff;
  color: #000000;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border: 1px solid #ccc;
`;
const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
