import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import styled from "styled-components";
import LoginInput from "../components/LoginInput";
import LoginPassword from "../components/LoginPassword";
import LoginEmail from "../components/LoginEmail";
import Button from "../components/Buttons/Button";
import ProfileIcon from "../assets/ProfileIcon.png";
import Lock from "../assets/Lock.png";
import Email from "../assets/Email.png";
import Topbar from "../components/Topbar";
import BackArrow from "../assets/BackArrow.png";
import { useNavigate } from "react-router-dom";

const UserRegistrationParent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const doUserRegistration = async function () {
    if (!username) {
      alert("Username is required.");
      return;
    }

    if (!email) {
      alert("Email is required.");
      return;
    }

    if (!password) {
      alert("Password is required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);

      const userProfile = new Parse.Object("UserProfile");
      userProfile.set("username", username);
      userProfile.set("email", email);
      userProfile.set("userPointer", Parse.User.current());

      await userProfile.save();

      // signUp method returns a Promise.. await
      const createdUser = await user.signUp();
      alert(
        `Success! User ${createdUser.getUsername()} was successfully created!`
      );
      navigate("/");
      return true;
    } catch (error) {
      alert(`Error! ${error}`);
      return false;
    }
  };

  return (
    <LogInContainer>
      <Topbar />
      <BackArrowContainer
        src={BackArrow}
        alt="Back Arrow"
        onClick={() => navigate("/userlogin")}
      />
      <Title>Create parent account</Title>
      <SubTitle>Sign up as a parent</SubTitle>

      <FormContainer>
        <LoginInput
          icon={ProfileIcon}
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <LoginEmail
          icon={Email}
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <LoginPassword
          icon={Lock}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <LoginPassword
          icon={Lock}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <Button
          color="blue"
          fullWidth
          title="Get started"
          onClick={() => doUserRegistration()}
        />
      </FormContainer>
    </LogInContainer>
  );
};
export default UserRegistrationParent;

const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
`;

const BackArrowContainer = styled.img`
  position: absolute;
  top: 100px;
  left: 20px;
  width: 24px;
  height: auto;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #000;
  margin: 10px 0;
`;

const SubTitle = styled.p`
  font-size: 0.9rem;
  color: #000000;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const FormContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
