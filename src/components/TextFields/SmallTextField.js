import styled from "styled-components";

export default function SmallTextField({ value, onChange }) {
  return (
    <StyledTextField
      value={value}
      onChange={onChange}
      type="text"
      placeholder="Type a message"
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