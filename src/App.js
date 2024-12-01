import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatOverview from "./screens/ChatOverview";
import ChildOverview from "./screens/ChildOverview";
import Parse from "parse/dist/parse.min.js";
import ContactsOverview from "./screens/ContactsOverview";
import UserRegistration from "./screens/UserRegistration";
import UserLogin from "./screens/UserLogIn";
import ChildRegistrationAwait from "./screens/ChildRegistrationAwait";

// Parse initialization configuration
const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ChatOverview
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          }
        />
        <Route
          path="/childoverview"
          element={
            <ChildOverview
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          }
        />
        <Route
          path="/contactsoverview"
          element={
            <ContactsOverview
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          }
        />
        <Route path="/userregistration" element={<UserRegistration />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route
          path="/childregistrationawait"
          element={<ChildRegistrationAwait />}
        />
      </Routes>
    </Router>
  );
}

export default App;
