import styled from "styled-components";
import plusIcon from "../assets/Plus.png";
import colors from "../assets/colors";
import BackArrow from "../assets/BackArrow.png";

export default function SideOverviewHeader({
  title,
  onAddClick,
  isAddingChat,
}) {
  return (
    <HeaderContainer>
      {isAddingChat && <StyledBackArrow onClick={onAddClick} src={BackArrow} />}
      <Header>{title}</Header>
      <StyledPlusIcon onClick={onAddClick} src={plusIcon} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vw;
`;

const Header = styled.h2`
  font-size: 20px;
  color: ${colors.black};
  text-align: left;
  margin: 20px 20px;
  font-family: "Barlow", serif;
`;

const StyledPlusIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 8px;
  margin-top: 8px;
  margin-right: 8px;
`;

const StyledBackArrow = styled.img`
  width: 20px;
  height: 15px;
  margin-left: 8px;
  margin-top: 25px;
  cursor: pointer;
`;
