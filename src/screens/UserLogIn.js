import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import styled from 'styled-components';
import logo from '../assets/Logo.png';
import LoginInput from "../components/LoginInput";
import LoginPassword from "../components/LoginPassword";
import Button from '../components/Buttons/Button';
import ProfileIcon from "../assets/ProfileIcon.png";
import Lock from "../assets/Lock.png";
import { useNavigate } from 'react-router-dom';

export const UserLogin = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate(); 
    	
    const getCurrentUser = async function () { 
    	const currentUser = await Parse.User.current();
    	setCurrentUser(currentUser);
    	return currentUser;
    };

const doUserLogIn = async function () {
    const usernameValue = username;
    const passwordValue = password;
    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      
      alert( // logIn returns ParseUser object/ the logged in user in database..
        	`Success! User ${loggedInUser.get(
        	'username'
        	)} has successfully signed in!`
      );

    const currentUser = await Parse.User.current();
      console.log(loggedInUser === currentUser);
      setUsername('');
      setPassword('');
      getCurrentUser(); 
      navigate('/');
      return true;
    } catch (error) {
        alert(`Error! ${error.message}`);
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
        <LoginPassword 
        icon={Lock} 
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        />
         <Button color="purple" fullWidth title= "Log in" onClick={ () => doUserLogIn() }/>
        <ForgotPassword>Forgot password?</ForgotPassword>
        <Separator><span>or</span></Separator>
        <Button color="blue" fullWidth title= "Sign up" onClick={() => navigate('/userregistrationparent')}/>
      </FormContainer>
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
  background-color: #ffffff;
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
  color: #000000;
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

const ForgotPassword = styled.a`
  font-size: 0.8rem;
  color: #000000;
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
    background: #000000;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }

  span {
    color: #000000;
    font-size: 1rem;
    font-weight: bold;
  }
`;