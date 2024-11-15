import styled from "styled-components";
import plusIcon from "../assets/Plus.png";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";

const SideOverview = ({ title }) => {
  return (
    <OverviewContainer>
      <HeaderContainer>
        <Header>{title}</Header>
        <StyledPlusIcon src={plusIcon} />
      </HeaderContainer>
      <Separator />
      <ItemContainer>
        <Item>
          <ProfileContainer>
            <ProfilePictureSmall />
          </ProfileContainer>
          <TextContainer>
            <Name>Johanna</Name>
            <MessageText>Hello. How are you doing..</MessageText>
          </TextContainer>
        </Item>
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

const Item = styled.div`
  height: 110px;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px; /* Align as close to the left as possible */
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-left: 25px;
  margin-top: 10px;
`;

const Name = styled.div`
  font-size: 1.4 em;
  font-weight: bold;
`;

const MessageText = styled.p`
  font-size: 0.9em;
`;
