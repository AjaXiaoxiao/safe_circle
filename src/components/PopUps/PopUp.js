import styled from "styled-components";
import XButton from "../Buttons/XButton";
import colors from "../../assets/colors";

//This Popup is used as the base in the other popups
const PopUp = ({ isVisible, onClose, title, description }) => {
  if (!isVisible) return null;

  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <h2>{title}</h2>
      <p>{description}</p>
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
  background-color: ${colors.white};
  color: ${colors.black};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-family: "Barlow", serif;
`;

//We know the text is centered because because flex-direction above ensures they are stored as in a column

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
