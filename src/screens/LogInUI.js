import React from 'react';
import styled from 'styled-components';
import logo from '../assets/Logo.png';
import LoginInput from "../components/LoginInput";
import LoginPassword from "../components/LoginPassword";
import Button from '../components/Buttons/Button';
import ProfileIcon from "../assets/ProfileIcon.png";
import Lock from "../assets/Lock.png";

const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: -10px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #000;
  margin: 10px 0;
`;

const SubTitle = styled.p`
  font-size: 0.9rem;
  color: black;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const FormContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ForgotPassword = styled.a`
  font-size: 0.8rem;
  color: black;
  margin: 10px 0;
  cursor: pointer;
  text-decoration: underline;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: black;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }

  span {
    color: black;
    font-size: 1rem;
    font-weight: bold;
  }
`;

export default function ChatOverview() {
  return (
    <LogInContainer>
      <Logo src={logo} alt="Logo" />
      <Title>Login</Title>
      <SubTitle>Log in to your account</SubTitle>

      <FormContainer>
        <LoginInput icon={ProfileIcon}/>
        <LoginPassword icon={Lock} placeholder="Password"/>
        <Button color="purple" fullWidth title= "Log in" />
        <ForgotPassword>Forgot password?</ForgotPassword>
        <Separator><span>or</span></Separator>
        <Button color="blue" fullWidth title= "Sign up" />
      </FormContainer>
    </LogInContainer>
  );
}
