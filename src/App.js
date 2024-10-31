import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatOverview from "./screens/ChatOverview";

function App() {
  const ChatOverviewHeader = "Chats";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatOverview title={ChatOverviewHeader} />} />
      </Routes>
    </Router>
  );
}

export default App;
