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
import { usePopUpManager } from "../components/Hooks/usePopUpManager";

export const UserLogin = () => {
  const {
    isRegistrationPopupVisible,
    handleRegistrationClick, 
  } = usePopUpManager();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const doUserLogIn = async function () {
    const usernameValue = username;
    const passwordValue = password;

    try {
      await Parse.User.logIn(usernameValue, passwordValue);
      const currentUser = await Parse.User.current();

      const userProfileQuery = new Parse.Query("UserProfile");
      userProfileQuery.equalTo("userPointer", currentUser);
      const userProfile = await userProfileQuery.first();

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
          onClick={handleRegistrationClick}
        />
      </FormContainer>
      <PopUpRegistration isVisible={isRegistrationPopupVisible} onClose={handleRegistrationClick} />
    </LogInContainer>
  );
};
export default UserLogin;

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
