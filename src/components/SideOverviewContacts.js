import styled from "styled-components";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import SideOverviewHeader from "./SideOverviewHeader";

export default function SideOverview({ title }) {
  return (
    <OverviewContainer>
      <SideOverviewHeader title={title}/>
      <Separator />
      <ItemContainer>
        <Item>
          <ProfileContainer>
            <ProfilePictureSmall />
          </ProfileContainer>
          <TextContainer>
            <Name>Mom</Name>
          </TextContainer>
        </Item>
      </ItemContainer>

      <ItemContainer>
        <Item>
          <ProfileContainer>
            <ProfilePictureSmall />
          </ProfileContainer>
          <TextContainer>
            <Name>Dad</Name>
          </TextContainer>
        </Item>
      </ItemContainer>

      <ItemContainer>
        <Item>
          <ProfileContainer>
            <ProfilePictureSmall />
          </ProfileContainer>
          <TextContainer>
            <Name>Johanna</Name>
          </TextContainer>
        </Item>
      </ItemContainer>
    </OverviewContainer>
  );
}



const OverviewContainer = styled.div`
  background-color: white;
  border: solid #ccc 1px;
  width: 30vw;
  height: 950px;
  border-top-left-radius: 20px;
  margin-top: 12vh;
  z-index: 10;
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
  margin: 20px 20px;
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
  width: 99.9%;
  background-color: #FFFFFF;
  border-top: solid #ccc 1px;
  border-bottom: solid #ccc 1px;
  display: flex;
  align-items: center; 
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px; 
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-left: 25px;
`;

const Name = styled.div`
  font-size: 1.4 em;
  font-weight: bold;
`;