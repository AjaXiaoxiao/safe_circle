import styled from "styled-components";
import colors from '../../assets/colors'; 

const ProfilePictureBig = () => {
  return (
    <ProfileContainer>
      <ProfilePic src="/ProfilePicture.jpg" alt="avatar" rounded />
    </ProfileContainer>
  );
};

export default ProfilePictureBig;

const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ProfilePic = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${(props) => (props.rounded ? "50%" : "0")};


  box-shadow: 0 0 0 9px  ${colors.white}, 0 0 0 13px ${colors.blue};
  background-color: ${colors.white};
`;
