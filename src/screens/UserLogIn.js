import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import styled from "styled-components";
import logo from "../assets/Logo.png";
import LoginInput from "../components/LoginInput";
import Button from "../components/Buttons/Button";
import ProfileIcon from "../assets/ProfileIcon.png";
import Lock from "../assets/Lock.png";
import { useNavigate } from "react-router-dom";
import PopUpRegistration from "../components/PopUps/PopUpRegistration";
import colors from "../assets/colors";

export const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  //error message is the read message dispalyed in the login container showing errors.
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  //We do not use
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    return currentUser;
  };

  const doUserLogIn = async function () {
    const usernameValue = username;
    const passwordValue = password;

    try {
      //the login method verifies credentials with server.
      //If I remove logged in user I get an error and cannot login.
      //As I understand it login both authenticates that username and password is correct
      //It creates a session token is a unique key connected to the user, meaning that the user does not have to log in every time they need access to personal data
      //It also ensures that we can identify the user by working with .current()
      //in our case it also helps us to rememebr what user that was logged in before
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      const currentUser = await Parse.User.current();

      const userProfileQuery = new Parse.Query("UserProfile");
      userProfileQuery.equalTo("userPointer", currentUser);
      const userProfile = await userProfileQuery.first();

      //If you successfully login but the userProfile is not to be found of under UserProfile.
      if (!userProfile) {
        setErrorMessage("UserProfile not found. Please contact support.");
        return false;
      }

      const isVerified = userProfile.get("isVerified");
      if (isVerified) {
        setUsername("");
        setPassword("");
        setErrorMessage("");
        navigate("/");
        return true;
      } else {
        setErrorMessage(
          "Your account is not approved. Please ask your parent to approve your account."
        );
        return false;
      }
    } catch (error) {
      setErrorMessage("Invalid username or password!");
      return false;
    }
  };
  //onChange is a variable triggered every time the user changes the contect in the input field.
  //the event argument in the arrow function is an object automatically passed by React when the onChange event is triggered.
  //event.target refers to the HTML element that triggered the event
  //event.target.value retrieves the current value of the input field
  return (
    <LogInContainer>
      <Logo src={logo} alt="Logo" />
      <Title>Login</Title>
      <SubTitle>Log in to your account</SubTitle>
      <FormContainer>
        <LoginInput
          icon={ProfileIcon}
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <LoginInput
          icon={Lock}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          color="purple"
          fullWidth
          title="Log in"
          onClick={() => doUserLogIn()}
        />
        <Separator>
          <span>or</span>
        </Separator>
        <Button
          color="blue"
          fullWidth
          title="Sign up"
          textColor="black"
          onClick={togglePopup}
        />
      </FormContainer>
      <PopUpRegistration isVisible={isPopupVisible} onClose={togglePopup} />
    </LogInContainer>
  );
};
export default UserLogin;
//We could have been better at name conventions the function attached to event handlers should be names handleXXX, so in our case
//a good name for togglePopup could be handleTogglePopup()

const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.white};
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: -10px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-family: "Barlow", serif;
  font-size: 2rem;
  font-weight: 600;
  color: ${colors.black};
  margin: 10px 0;
`;

const SubTitle = styled.p`
  font-family: "Barlow", serif;
  font-size: 0.9rem;
  color: ${colors.black};
  margin-top: 5px;
  margin-bottom: 5px;
`;

const FormContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${colors.black};
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }

  span {
    color: ${colors.black};
    font-size: 1rem;
    font-weight: bold;
  }
`;

const ErrorText = styled.p`
  color: ${colors.hoverRed};
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center;
`;
