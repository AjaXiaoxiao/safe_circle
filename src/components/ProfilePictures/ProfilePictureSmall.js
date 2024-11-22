import styled from "styled-components";
import colors from '../../assets/colors'; 

const ProfilePictureSmall = () => {
  return (
    <ProfileContainer>
      <ProfilePic src="/ProfilePicture.jpg" alt="avatar" rounded />
    </ProfileContainer>
  );
};

export default ProfilePictureSmall;

const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: ${(props) => (props.rounded ? "50%" : "0")};


  box-shadow: 0 0 0 6px ${colors.white}, 0 0 0 8px ${colors.blue};
  background-color:${colors.white};
`;
