import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//I rename BrowserRouter to Router to make it more convenient.
import ChatOverview from "./screens/ChatOverview";
import ChildOverview from "./screens/ChildOverview";
import Parse from "parse/dist/parse.min.js";
import ContactsOverview from "./screens/ContactsOverview";
import UserRegistration from "./screens/UserRegistration";
import UserLogin from "./screens/UserLogIn";
import ChildRegistrationAwait from "./screens/ChildRegistrationAwait";
import RequireLogin from "./components/RequireLogin";
import { ChatProvider } from "./contexts/ChatContext";
//Responsible for rendering the Toast
//The reason for the Curcly braces is because that we
//ecport the ToastProvider component for instance differently
//compared to ChatOverview for instance.
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "./contexts/ToastContext";
import { ContactProvider } from "./contexts/ContactContext";
import "react-toastify/dist/ReactToastify.css";

// Parse initialization configuration
const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
//Authenticates your app when it connects to the parse server
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
//Tells parse which app I am using and authenticates your connection
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
//Tells parse where the Parse server is located.
Parse.serverURL = PARSE_HOST_URL;
//Details are stored in the .env file since this is sensitive information.

//Router is the top level component providing the infrastructures for the routing
//Routes is the container for all routes
//Route is each sepcific roupte
function App() {
  return (
    <ToastProvider>
      <ChatProvider>
        <ContactProvider>
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
        </ContactProvider>
      </ChatProvider>
    </ToastProvider>
  );
}

export default App;
