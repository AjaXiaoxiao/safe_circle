import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatOverview from "./screens/ChatOverview";
import ChildOverview from "./screens/ChildOverview";
import Parse from "parse/dist/parse.min.js";
import ContactsOverview from "./screens/ContactsOverview";
import UserRegistration from "./screens/UserRegistration";
import UserLogin from "./screens/UserLogIn";
import ChildRegistrationAwait from "./screens/ChildRegistrationAwait";
import RequireLogin from "./components/RequireLogin";
import { ChatProvider } from "./contexts/ChatContext";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "./contexts/ToastContext";
import { ListReloadProvider } from "./contexts/ListReloadContext";
import "react-toastify/dist/ReactToastify.css";

// Parse initialization configuration
const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <ToastProvider>
      <ChatProvider>
        <ListReloadProvider>
          <Router>
            <ToastContainer />
            <Routes>
              <Route
                path="/"
                element={
                  <RequireLogin>
                    <ChatOverview />
                  </RequireLogin>
                }
              />
              <Route
                path="/childoverview"
                element={
                  <RequireLogin>
                    <ChildOverview />
                  </RequireLogin>
                }
              />
              <Route
                path="/contactsoverview"
                element={
                  <RequireLogin>
                    <ContactsOverview />
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
        </ListReloadProvider>
      </ChatProvider>
    </ToastProvider>
  );
}

export default App;
