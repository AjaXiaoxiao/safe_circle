import styled from "styled-components";


// Input component definition
const Input = ({icon, placeholder}) => {
  return (
    <InputWrapper>
      <Icon src={icon} />
      <StyledInput type="text" placeholder={placeholder} />
    </InputWrapper>
  );
};

export default Input;

// Styled components
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Icon = styled.img`
  position: absolute;
  margin-top: 21px;
  margin-left: 10px;
  width: 1.4em; /* Adjust icon size */
  height: auto; /* Maintain aspect ratio */
`;

const StyledInput = styled.input`
  padding: 10px 10px 10px 2.5em;
  
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  border: 2px solid #fee180;
  width: 100%;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;
