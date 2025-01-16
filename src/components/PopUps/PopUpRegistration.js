import styled from "styled-components";
import XButton from "../Buttons/XButton";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
import colors from "../../assets/colors";

const PopUp = ({ isVisible, onClose }) => {
  const navigate = useNavigate();

  //if visible is false then exit and do not render the component
  if (!isVisible) return null;
  //I believe that onClick below in CloseButton component is the togglePopup.
  //togglePopup changes the useState value in UserLogin making the UserLogin component
  //to re-render making the Pop up also rerender, hence the popupregistration will not be renedered :)
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
          onClick={() =>
            navigate("/userregistration", {
              state: { registrationType: "parent" },
            })
          }
        />
        <Button
          title="Child account"
          color="yellow"
          width="default"
          textColor="black"
          onClick={() =>
            navigate("/userregistration", {
              state: { registrationType: "child" },
            })
          }
        />
      </ButtonContainer>
    </PopUpContainer>
  );
};
//useNavigate cna pass a state object that in this case is an object
//so that I can pass data down to another component
export default PopUp;

//Fixed makes the popup container stay in the same location even if the page scrolls
const PopUpContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 250px;
  background-color: #ffffff;
  color: ${colors.black};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  z-index: 3;
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
  color: ${colors.black};
  text-align: center;
  font-family: "Barlow", serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
