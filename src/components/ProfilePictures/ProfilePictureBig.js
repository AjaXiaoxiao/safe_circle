import styled from "styled-components";

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


  box-shadow: 0 0 0 9px #fff, 0 0 0 13px #a9e7eb;
  background-color: #ffffff;
`;
