import styled from "styled-components";
import SendIcon from "../../assets/Send.png";
import PropTypes from "prop-types";
import { GrClose } from "react-icons/gr";
import PlusIcon from "../../assets/Plus.png";
import colors from "../../assets/colors"; // imports our color library which is referenced in getColor

const getIcon = (icon) => {
  switch (icon) {
    case "send":
      return SendIcon;
    case "x":
      return GrClose;
    case "plus":
      return PlusIcon;
    default:
      return null;
  }
};

const getColor = (color) => {
  switch (color) {
    case "purple":
      return { base: colors.purple, hover: colors.hoverPurple };
    case "red":
      return { base: colors.red, hover: colors.hoverRed };
    case "blue":
      return { base: colors.blue, hover: colors.hoverBlue };
    case "yellow":
      return { base: colors.yellow, hover: colors.hoverYellow };
    default:
      return { base: colors.purple, hover: colors.hoverPurple };
  }
};

const getTextColor = (textColor) => {
  switch (textColor) {
    case "white":
      return "white";
    case "black":
      return "black";
    default:
      return "white";
  }
};

const getWidth = (width) => {
  switch (width) {
    case "fullWidth":
      return "100%";
    case "regular":
      return "30%";
    default:
      return "40%";
  }
};

const Button = ({ title, color, icon, width, onClick }) => {
  return (
    <StyledButton type="button" color={color} width={width} iconOnly={!!icon} onClick={onClick}>
      {icon ? <img src={getIcon(icon)} alt={`${icon} icon`} /> : title}
    </StyledButton>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["purple", "red", "blue", "yellow"]),
  icon: PropTypes.oneOf(["send", "x", "plus"]),
  width: PropTypes.oneOf(["fullWidth", "regular"]),
  textColor: PropTypes.oneOf(["white", "black"]),
};

const StyledButton = styled.button`
  margin: 10px;
  width: ${({ iconOnly, width }) => (iconOnly ? "40px" : getWidth(width))};
  height: ${({ iconOnly }) => (iconOnly ? "40px" : "auto")};
  padding: ${({ iconOnly }) => (iconOnly ? "8px" : "10px 20px")};
  border-radius: ${({ iconOnly }) => (iconOnly ? "50%" : "20px")};
  border: none;
  background-color: ${({ iconOnly, color }) =>
    iconOnly ? "transparent" : getColor(color).base};
  color: ${({ textColor }) => getTextColor(textColor)};
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background-color: ${({ color }) => getColor(color).hover};
  }
  img {
    width: 20px;
    height: 20px;
  }
`;
