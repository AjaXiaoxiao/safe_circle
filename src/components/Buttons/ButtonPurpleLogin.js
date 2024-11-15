import styled from "styled-components";

const ButtonPurple = ({ title, onClick }) => {
  return <StyledButton onClick={onClick}>{title}</StyledButton>;
};

export default ButtonPurple;

const StyledButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  width: 100%;
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
