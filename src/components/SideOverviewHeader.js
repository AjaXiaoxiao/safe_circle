import styled from "styled-components";
import plusIcon from "../assets/Plus.png";
import colors from '../assets/colors'; 

export default function SideOverviewHeader({ title, onAddClick }) {
  return (
    <HeaderContainer>
      <Header>{title}</Header>
      <StyledPlusIcon onClick={onAddClick} src={plusIcon}/>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vw;
`;

const Header = styled.h2`
  font-size: 18px;
  color: ${colors.black};
  text-align: left;
  margin: 20px 20px;
`;

const StyledPlusIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 8px;
  margin-top: 8px;
  margin-right: 8px;
`;
