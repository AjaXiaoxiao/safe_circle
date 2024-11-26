import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PopUpSignedIn from "../components/PopUps/PopUpSignedIn";

const ChatOverview = ({ title}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    isChild: false,
    isVerified: false,
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setIsPopupVisible(true);
      setUserData(location.state); 
    }
  }, [location.state]);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview title={title} 
        isPopupVisible={isPopupVisible} 
        handleOpenPopup={handleOpenPopup}
        handleClosePopup={handleClosePopup}/>
        <ChatComponent isPopupVisible={isPopupVisible}/>
      </ColumnContainer>
      {isPopupVisible && (
        <PopUpSignedIn
          isVisible={isPopupVisible}
          onClose={handleClosePopup}
          username={userData.username}
          isChild={userData.isChild}
          isVerified={userData.isVerified}
        />
      )}
    </div>
  );
};
export default ChatOverview;

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;
