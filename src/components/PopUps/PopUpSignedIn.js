import styled from "styled-components";
import XButton from "../Buttons/XButton";

const PopUpSignedIn = ({
  isVisible,
  onClose,
  username,
  isChild,
  isVerified,
}) => {
  if (!isVisible) return null;

  //It will only show for kids since this container only is renedered thorough the child registration await
  const message = isChild
    ? isVerified
      ? `You are now ready to use SafeCircle!`
      : `Welcome to SafeCircle! Your guardian needs to approve your profile before you can login.`
    : `You are now ready to use SafeCircle!`;

  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <h2>Welcome {username}!</h2>
      <p></p>
      <p>{message}</p>
    </PopUpContainer>
  );
};

export default PopUpSignedIn;

const PopUpContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background-color: white;
  color: black;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  z-index: 2;
  border: 3px solid #bb65ff;
  font-family: "Barlow", serif;
`;
const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
