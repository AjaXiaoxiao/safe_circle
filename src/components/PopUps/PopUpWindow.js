import styled from "styled-components";
import XButton from "../Buttons/XButton";

const PopUp = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <h2>Popup Content</h2>
      <p>This is a pop-up window.</p>
    </PopUpContainer>
  );
};

export default PopUp;

const PopUpContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 400px;
  background-color: white;
  color: black;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensures the popup is on top */
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
