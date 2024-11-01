import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatOverview from "./screens/ChatOverview";

function App() {
  const [message, setMessage] = useState("");

  const onEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const [isPopupVisible, setPopupVisible] = useState(true);
  const togglePopup = () => setPopupVisible(!isPopupVisible);
  
  return (
    <div className="App">
      <header className="App-header"></header>
      <PendingIcon />
      <Sidebar />
      <Topbar />

      <NamebarTop/>
      <Chatbar value={message}
        onChange={(e) => setMessage(e.target.value)} onSelectEmoji={onEmojiSelect}/>
      <SideOverview title="Chats" />
      <TextField />
      <TextFieldWithIcon icon={Email} placeholder={"Your email"} />
      <NotificationCircle count={1} />
      <ButtonPurple />
      <ButtonYellow />
      <ButtonRed />
      <PopUp isVisible={isPopupVisible} onClose={togglePopup} />
      <ProfilePictureBig />
      <MessageBubble />
    </div>
  );
}

export default App;
