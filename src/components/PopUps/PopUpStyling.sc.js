import styled from "styled-components";
import colors from "../../assets/colors";

export const PopUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 450px;
  margin-left: 20%;
  background-color: ${colors.white};
  color: ${colors.black};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border: 1px solid #ccc;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const ProfilePicContainer = styled.div`
  margin-top: 60px;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-items: center;
  margin-top: 30px;
`;

export const Label = styled.label`
  font-size: 10px;
  color: ${colors.grey};
  margin-bottom: 0px;
  align-items: left;
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;
