import styled from "styled-components";

const ButtonPurple = ({ text = "Send request" }) => {
  return <StyledButton type="button">{text}</StyledButton>;
};

export default ButtonPurple;

const StyledButton = styled.button`
  margin: 20px;
  padding: 10px 50px;
  border-radius: 20px;
  border: none;
  background-color: #bb65ff;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s; /* Smooth transition for hover effect */

  &:hover {
    background-color: #9e54d9; /* Darker shade on hover */
  }
`;
