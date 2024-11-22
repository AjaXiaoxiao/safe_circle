import React from 'react';
import styled from 'styled-components';
import LoginInput from "../components/LoginInput";
import Button from '../components/Buttons/Button';
import ProfileIcon from "../assets/ProfileIcon.png";
import Lock from "../assets/Lock.png";
import Email from "../assets/Email.png";
import Topbar from '../components/Topbar';
import BackArrow from "../assets/BackArrow.png";
import colors from '../assets/colors'; 

export default function SignUpParent() {
  return (
    <LogInContainer>
      <Topbar />  
      <BackArrowContainer src={BackArrow} alt="Back Arrow" />
      <Title>Create parent account</Title>
      <SubTitle>Sign up as a parent</SubTitle>

      <FormContainer>
        <LoginInput icon={ProfileIcon} placeholder="Username"/>
        <LoginInput icon={Email} placeholder="Email"/>
        <LoginInput icon={Lock} placeholder="Password"/>
        <LoginInput icon={Lock} placeholder="Confirm password"/>
        <Button color="blue" title= "Get started" />
      </FormContainer>
    </LogInContainer>
  );
}

const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.white};
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


