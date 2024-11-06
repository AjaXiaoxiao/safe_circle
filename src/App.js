import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatOverview from "./screens/ChatOverview";
import PopUpContactPage from "./screens/PopUpContactPage";
import ChildOverviewPage from "./screens/ChildOverviewPage";
import Parse from 'parse/dist/parse.min.js';

// Parse initialization configuration
const PARSE_APPLICATION_ID = 'DTmn145degEZbGPGdfOE2zxrYRLWRG8WOO135pKw';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = '9T8j0uEAOtfZW3fdCrpvg58pdwZvwGl44qZgyCBb';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const ChatOverviewHeader = "Chats";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatOverview title={ChatOverviewHeader} />} />
        <Route path="/Contacts" element={<PopUpContactPage />} />
        <Route path="/ChildOverview" element={<ChildOverviewPage/>} />
        </Routes>
    </Router>
  );
}

export default App;
