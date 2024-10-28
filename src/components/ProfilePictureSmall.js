import React from "react";
import styled from "styled-components";

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
`;

const ProfilePic = styled.img`
  width: 40px; 
  height: 40px;
  object-fit: cover;
  border-radius: ${(props) => (props.rounded ? "50%" : "0")}; 

  /* Create an offset border */
  box-shadow: 0 0 0 6px #FFF, 0 0 0 8px #A9E7EB;
  background-color: #FFFFFF; 
`;
