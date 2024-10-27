
import ButtonPurple from './components/Buttons/ButtonPurple';
import ButtonYellow from './components/Buttons/ButtonYellow';
import Input from './components/LoginInput';
import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Topbar from "./components/Topbar/Topbar.js";
import TextField from "./components/TextFields/TextField.js";
import ButtonRed from './components/Buttons/ButtonRed.js';
import ProfilePictureBig from './components/ProfilePictureBig.js';
import ProfilePictureSmall from './components/ProfilePictureSmall.js';
import PopUp from './components/PopUpWindow.js';
import { useState } from 'react';

function App() {
  const [isPopupVisible, setPopupVisible] = useState(true);
  const togglePopup = () => setPopupVisible(!isPopupVisible);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Input/>
        <ButtonPurple />
        <ButtonYellow />
        <ButtonRed />
        
        <PopUp isVisible={isPopupVisible} onClose={togglePopup}/>
        
        <ProfilePictureBig />
        
      </header>
      <Sidebar />
      <Topbar />
      <TextField />
    </div>
  );
}

export default App;
