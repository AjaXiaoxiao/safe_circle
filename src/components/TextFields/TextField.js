import styled from "styled-components";
import colors from '../../assets/colors'; 

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
  background-color: ${colors.lightGrey};
  width: 70%;
  color: ${colors.grey};
  border-radius: 7px;
  border: none;
  font-size: 1em;
  padding: 1em;
  margin: 0.6em;
  margin-right: 2em;
  margin-left: 2em;
  max-height: 90%;
`;
