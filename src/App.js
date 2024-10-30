import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatOverview from "./screens/ChatOverview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatOverview />} />
      </Routes>
    </Router>
  );
}

export default App;
