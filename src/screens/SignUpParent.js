import React from 'react';
import styled from 'styled-components';
import LoginInput from "../components/LoginInput";
import LoginPassword from "../components/LoginPassword";
import LoginEmail from "../components/LoginEmail";
import ButtonBlue from '../components/Buttons/ButtonBlue';
import ProfileIcon from "../assets/ProfileIcon.png";
import Lock from "../assets/Lock.png";
import Email from "../assets/Email.png";
import Topbar from '../components/Topbar';
import BackArrow from "../assets/BackArrow.png";

const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
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


export default function ChatOverview() {
  return (
    <LogInContainer>
      <Topbar />  
      <BackArrowContainer src={BackArrow} alt="Back Arrow" />
      <Title>Create parent account</Title>
      <SubTitle>Sign up as a parent</SubTitle>

      <FormContainer>
        <LoginInput icon={ProfileIcon}/>
        <LoginEmail icon={Email} placeholder="Email"/>
        <LoginPassword icon={Lock} placeholder="Password"/>
        <LoginPassword icon={Lock} placeholder="Confirm password"/>
        <ButtonBlue title= "Get started" />
      </FormContainer>
    </LogInContainer>
  );
}
