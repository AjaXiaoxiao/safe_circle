import styled from "styled-components";

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
  background-color: #ffffff;
  width: 23%;
  color: #000000;
  border-radius: 16px;
  border: solid #fed449;
  font-size: 1em;
  padding: 1em 1em 1em 4em;
  margin: 0.6em;
`;
