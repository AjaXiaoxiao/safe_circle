import styled from "styled-components";

const TextFieldWrapper = styled.div`
  width: 100%; /*this is the width of the whole parent container. In this case the parent container will the whole screen.*/
`;

const StyledIcon = styled.img`
  position: relative;
  left: 60px;
  width: 2em; /* Adjust icon size */
  height: auto; /* Maintain aspect ratio */
`;

const StyledTextFieldSmall = styled.input`
  background-color: #white;
  width: 23%;
  color: #black;
  border-radius: 16px;
  border: solid #fed449;
  font-size: 1em;
  padding: 1em 1em 1em 4em;
  margin: 0.6em;
`;

export default function TextFieldWithIcon({ icon, placeholder }) {
  return (
    <TextFieldWrapper>
      <StyledIcon src={icon} />
      <StyledTextFieldSmall type="text" placeholder={placeholder} />
    </TextFieldWrapper>
  );
}
