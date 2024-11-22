import styled from "styled-components";
import XButton from "../Buttons/XButton";
import Button from "../Buttons/Button";
import { useNavigate } from 'react-router-dom';


const PopUp = ({ isVisible, onClose }) => {
    const navigate = useNavigate();

    if (!isVisible) return null;
  

  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <Title>Choose your account type</Title>
      <ButtonContainer>
        <Button
          title="Parent account"
          color="yellow"
          width="default"
          textColor="black"
          onClick={() => navigate("/userregistrationparent")}
        />
        <Button
          title="Child account"
          color="yellow"
          width="default"
          textColor="black"

        />
      </ButtonContainer>
    </PopUpContainer>
  );
};

export default PopUp;

const PopUpContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 250px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  z-index: 2; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;




