import logo from "./logo.svg";
import ButtonPurple from "./components/Buttons/ButtonPurple.js";
import ButtonYellow from "./components/Buttons/ButtonYellow";
import Input from "./components/LoginInput";
import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Topbar from "./components/Topbar/Topbar.js";
import TextField from "./components/TextFields/TextField.js";
import ButtonRed from "./components/Buttons/ButtonRed.js";
import ProfilePictureBig from "./components/ProfilePictureBig.js";
import PopUp from "./components/PopUpWindow.js";
import { useState } from "react";
import TextFieldWithIcon from "./components/TextFields/TextFieldWithIcon.js";
import Email from "./assets/Email.png";
import Lock from "./assets/Lock.png";
import ProfileIcon from "./assets/ProfileIcon.png";
import NotificationCircle from "./components/NotificationCircle.js";
import SideOverview from "./components/SideOverview.js";
import ButtonRed from './components/Buttons/ButtonRed.js';
import ProfilePictureBig from './components/ProfilePictureBig.js';
import PopUp from './components/PopUpWindow.js';
import { useState } from 'react';
import PendingIcon from './components/PendingIcon.js';
import MessageBubble from './components/MessageBubble.js';

function App() {
  const [isPopupVisible, setPopupVisible] = useState(true);
  const togglePopup = () => setPopupVisible(!isPopupVisible);
  return (
    <div className="App">
      <header className="App-header">
    
      </header>
      <PendingIcon />
      <Sidebar />
      <Topbar />
      <SideOverview title="Chats" />
      <TextField />
      <TextFieldWithIcon icon={Email} placeholder={"Your email"} />
      <NotificationCircle count={1} />
      <ButtonPurple />
      <ButtonYellow />
      <ButtonRed />
      <PopUp isVisible={isPopupVisible} onClose={togglePopup}/>
      <ProfilePictureBig />
      <MessageBubble />
    </div>
  );
}

export default App;
