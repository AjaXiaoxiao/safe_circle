import styled from "styled-components";
import colors from "../../assets/colors";

const ProfilePictureSmall = () => {
  return (
    <ProfileContainer>
      <ProfilePic src="/ProfilePicture.jpg" alt="avatar" rounded />
    </ProfileContainer>
  );
};

//rounded above is a prop that we pass to the ProfilePic component.
//Since there is no value assigned to the prop (like rounded={true})
//it by default becomes boolean that is true
//IMPROVEMENT: in our case we always want the profile picture to be rounded so it is
//not neccessary to assign border-radius with the rounded boolean

export default ProfilePictureSmall;

//I think that styled. and what you place after styled. has an effect
//on how the search engine interprets the code and what it is
//but it also makes it easier for the developers to know
//what the styling is for.

//display: flex - makes it more flexible to work with items
//justify-content is a flexbox property, so without display: flex we cannot work with it.
//justify-content aligns items vertically
//flex-wrap: wrap; - ensures that when the screen size becomes smaller, if therer are multiple profile pictures
//they are displayed in a column below each other.
const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

//In our case the flex-wrap and gap is probably not neccessary since ProfileContainer only contains
//One ProfilePic component. However, it could provide flexibility if we in the future would like to add a page showing all contacts
// for instance.

//when using arrow functions in Styled Components we access the props passed into the styled components
//object-fit: cover; - cuts off the sides of an image making sure it fits, without being cramped.
//box-shadow: - 0 position in relation to the image, 6px how wide should the border be starting from the picture
const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: ${(props) => (props.rounded ? "50%" : "0")};
  box-shadow: 0 0 0 6px ${colors.white}, 0 0 0 8px ${colors.blue};
  background-color: ${colors.white};
`;
