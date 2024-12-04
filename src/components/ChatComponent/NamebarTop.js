import contact from "../../assets/Contact.png";
import styled from "styled-components";
import colors from "../../assets/colors";

const NamebarTop = ({ username }) => {
  return (
    <StyledNamebarTop>
      <StyledImage
        src={contact}
        alt="contact"
        className="namebar-top-contact"
      ></StyledImage>
      <text className="namebar-top-text"> {username} </text>
    </StyledNamebarTop>
  );
};

export default NamebarTop;

const StyledNamebarTop = styled.div`
  width: 100%;
  height: 23vh;
  display: flex;
  flex-direction: row;
  flex-grow: 0 1 0;
  gap: 2em;
  padding-left: 40px;
  justify-self: right;
  border: solid ${colors.grey} 1px;
  fill: ${colors.white};
  align-items: center;
  justify-content: left;
  font-size: large;
  font-weight: 700;
  background-color: ${colors.white};
  font-family: Arial, Helvetica, sans-serif;
`;

const StyledImage = styled.img`
  max-height: 80%;
  height: auto;
  width: auto;
  object-fit: contain;
`;
