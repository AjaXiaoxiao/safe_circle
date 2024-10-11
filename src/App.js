
import logo from './logo.svg';
import ButtonPurple from './components/buttonPurple';
import ButtonYellow from './components/buttonYellow';
import Input from './components/LoginInput';
import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Topbar from "./components/Topbar/Topbar.js";
import TextField from "./components/TextField.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Input
          type="text"
          placeholder="Username"
          showPassword={false}
        />
        <Input
          type="password"
          placeholder="Password"
          showPassword={false}
        />
        <ButtonPurple type="submit" text="Send request" />
        <ButtonYellow type="submit" text="Child account" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
      <Sidebar />
      <Topbar />
      <TextField />
    </div>
  );
}

export default App;
