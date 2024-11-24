import styled from "styled-components";

const TextField = ({ value, onChange }) => {
  return (
    <StyledTextField
      value={value}
      onChange={onChange}
      type="text"
      placeholder="Type a message"
    />
  );
};
export default TextField;

const StyledTextField = styled.input`
  background-color: #f0f2f5;
  width: 70%;
  color: #6b7c85;
  border-radius: 7px;
  border: none;
  font-size: 1em;
  padding: 1em;
  margin: 0.6em;
  margin-right: 2em;
  margin-left: 2em;
  max-height: 90%;
`;
