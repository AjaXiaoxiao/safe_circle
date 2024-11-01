import React, { useState } from "react";
import "../App.css";
import Sidebar from "../components/Sidebar/Sidebar.js";
import Topbar from "../components/Topbar/Topbar.js";
import NamebarTop from '../components/ChatComponent/NamebarTop.js';
import Chatbar from '../components/ChatComponent/Chatbar.js';
import SideOverview from "../components/SideOverview.js";
import MessageBubble from "../components/MessageBubble.js"; 
import PopUpAddNewContact from '../components/PopUpAddNewContact.js';
import styled from "styled-components";
import TopAndSideBar from "../components/TopAndSideBar.js";

function AddNewContactScreen() {
  const [message, setMessage] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(true);

  const onEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const togglePopup = () => setPopupVisible(!isPopupVisible);
  
  return (
    <AppContainer>
      <SidebarContainer>
        <TopAndSideBar />
      </SidebarContainer>
      <MainContainer>
        <ChatContainer>
            <SideOverview title="Contacts" />
            <ChatArea>
            <NamebarTopContainer>
              <NamebarTop />
            </NamebarTopContainer>
            <MessagesContainer>
              <MessageBubble />
            </MessagesContainer>
            <ChatbarContainer>
              <Chatbar
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onSelectEmoji={onEmojiSelect}
              />
            </ChatbarContainer>
            <PopUpAddNewContact />
          </ChatArea>
        </ChatContainer>
      </MainContainer>
      {isPopupVisible && (
        <PopUpAddNewContact isVisible={isPopupVisible} onClose={togglePopup} />
      )}
    </AppContainer>
  );
}

export default AddNewContactScreen;

// Styled components for layout
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0; /* Adjust to your background color */
`;

const SidebarContainer = styled.div`
  width: 80px; 
  background-color: #fff;
  z-index: 1;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #white; 
  z-index: 2;
`;


const ChatContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin-top: 66px; 
  background-color: white;
  border-top-left-radius: 20px;
`;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #e6f7ff; /* Light blue background for chat area */
  position: relative;
  overflow: hidden;
  
`;

const NamebarTopContainer = styled.div`
  position: relative;
  width: 100%;
  flex-shrink: 0;
 
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
`;

const ChatbarContainer = styled.div`
  position: relative;
  width: 100%;
  flex-shrink: 0;
`;
