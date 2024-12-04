import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatOverview from "./screens/ChatOverview";
import ChildOverview from "./screens/ChildOverview";
import Parse from "parse/dist/parse.min.js";
import ContactsOverview from "./screens/ContactsOverview";
import UserRegistration from "./screens/UserRegistration";
import UserLogin from "./screens/UserLogIn";
import ChildRegistrationAwait from "./screens/ChildRegistrationAwait";
import RequireLogin from "./components/RequireLogin";

// Parse initialization configuration
const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentReceiverId, setCurrentReceiverId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RequireLogin>
            <ChatOverview
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              currentReceiverId={currentReceiverId}
              setCurrentReceiverId={setCurrentReceiverId}
            />
            </RequireLogin>
          }
        />
        <Route
          path="/childoverview"
          element={
            <RequireLogin>
            <ChildOverview
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              currentReceiverId={currentReceiverId}
              setCurrentReceiverId={setCurrentReceiverId}
            />
            </RequireLogin>
          }
        />
        <Route
          path="/contactsoverview"
          element={
            <RequireLogin>
            <ContactsOverview
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              currentReceiverId={currentReceiverId}
              setCurrentReceiverId={setCurrentReceiverId}
            />
            </RequireLogin>
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
