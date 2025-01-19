import styled from "styled-components";
import colors from "../assets/colors";

const Input = ({ icon, type = "text", placeholder, value, onChange }) => {
  return (
    <InputWrapper>
      <Icon src={icon} />
      <StyledInput
        type={
          placeholder === "Password" || placeholder === "Confirm password"
            ? "password"
            : type
        }
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Icon = styled.img`
  position: absolute;
  margin-top: 21px;
  margin-left: 10px;
  width: 1.5em;
  height: auto;
`;

const StyledInput = styled.input`
  padding: 10px 10px 10px 2.5em;

  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  border: 2px solid ${colors.yellow};
  width: 100%;
  background-color: ${colors.white};
  box-shadow: 0px 4px 10px ${colors.grey};
`;
