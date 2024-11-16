import styled from "styled-components";
import SideOverviewHeader from "./SideOverviewHeader"
import ContactItem from "./ContactItem";

const SideOverview = ({ title }) => {
  return (
    <OverviewContainer>
      <SideOverviewHeader title={title}/>
      <Separator/>
      <ItemContainer>
        <ContactItem userId="UeBIhGKTZR"/>
      </ItemContainer>
    </OverviewContainer>
  );
};
export default SideOverview;

//Container for the overview rectangle
const OverviewContainer = styled.div`
  background-color: #ffffff;
  border: solid #ccc 1px;
  width: 30vw;
  height: 88vh;
  border-top-left-radius: 20px;
  margin-top: 12vh;
  z-index: 2;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vw;
`;

const Header = styled.h2`
  font-size: 18px;
  color: #222;
  text-align: left;
  margin: 40px 50px;
`;

const StyledPlusIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 8px;
  margin-top: 8px;
  margin-right: 8px;
`;

const Separator = styled.div`
  height: 1px;
  background-color: #ccc;
  width: 99.9%;
`;

const ItemContainer = styled.div`
  height: calc(80vs - 100px);
`;

