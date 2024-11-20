import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import React, { useState } from "react";

const ChatOverview = ({ title}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
    </div>
  );
};
export default ChatOverview;

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;
