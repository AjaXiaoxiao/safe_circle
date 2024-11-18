import styled from "styled-components";

export default function SmallTextField({ name, value, placeholder, onChange }) {
  return (
    <StyledTextField
      name={name}
      value={value}
      onChange={onChange}
      type="text"
      placeholder={placeholder}
    />
  );
}

const StyledTextField = styled.input`
  background-color: #f0f2f5;
  width: 80%;
  height: 10%;
  color: #6b7c85;
  border-radius: 7px;
  border: none;
  font-size: 0.8em;
  padding: 1em;
  margin: 0.6em;
  margin-right: 2em;
  margin-left: 2em;
  
`;