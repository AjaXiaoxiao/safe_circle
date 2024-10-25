import styled from "styled-components";

const StyledTextField = styled.input`
  background-color: #f0f2f5;
  width: 40%;
  color: #6b7c85;
  border-radius: 7px;
  border: none;
  font-size: 1em;
  padding: 1em;
  margin: 0.6em;
`;

export default function TextField() {
  return <StyledTextField type="text" placeholder="Type a message" />;
}
