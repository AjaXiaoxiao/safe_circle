import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar.js'; 
import Topbar from './components/Topbar/Topbar.js';

function App() {
  return (
    <div className="App">

      <Sidebar />
      <Topbar/>
    </div>
  );
}

export default App;
