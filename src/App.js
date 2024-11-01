import ButtonPurple from './components/Buttons/ButtonPurple'; 
import ButtonYellow from './components/Buttons/ButtonYellow';

import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Topbar from "./components/Topbar/Topbar.js";
import NamebarTop from './components/ChatComponent/NamebarTop.js';
import Chatbar from './components/ChatComponent/Chatbar.js';
import TextField from "./components/TextFields/TextField.js";
import ButtonRed from "./components/Buttons/ButtonRed.js";

import TextFieldWithIcon from "./components/TextFields/TextFieldWithIcon.js";
import Email from "./assets/Email.png";
import NotificationCircle from "./components/NotificationCircle.js";
import SideOverview from "./components/SideOverview.js";
import ProfilePictureBig from "./components/ProfilePictureBig.js";
import PopUp from "./components/PopUpWindow.js";
import PendingIcon from "./components/PendingIcon.js";
import MessageBubble from "./components/MessageBubble.js"; 
import PopUpAddNewContact from './components/PopUpAddNewContact.js';
import SmallTextField from './components/TextFields/SmallTextField.js';
import AddNewContactScreen from './screens/addNewContactRequestScreen.js';
import TopAndSideBar from './components/TopAndSideBar.js';

function App() {
  
  return (
    <div className="App">
      <header className="App-header"></header>
      <AddNewContactScreen />
    </div>
  );
}

export default App;
