import styled from "styled-components";
import colors from '../../assets/colors'; 

const TextFieldWithIcon = ({ icon, placeholder }) => {
  return (
    <TextFieldWrapper>
      <StyledIcon src={icon} />
      <StyledTextFieldSmall type="text" placeholder={placeholder} />
    </TextFieldWrapper>
  );
};

export default TextFieldWithIcon;

const TextFieldWrapper = styled.div`
  width: 100%; /*this is the width of the whole parent container. In this case the parent container will the whole screen.*/
`;

const StyledIcon = styled.img`
  position: relative;
  left: 60px;
  width: 2em;
  height: auto;
`;

const StyledTextFieldSmall = styled.input`
  background-color: ${colors.white};
  width: 23%;
  color:  ${colors.black};
  border-radius: 16px;
  border: solid  ${colors.yellow};
  font-size: 1em;
  padding: 1em 1em 1em 4em;
  margin: 0.6em;
`;
