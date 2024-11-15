import React, { useState } from 'react'; 
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverviewRequests from "../components/SideOverviewRequests";
import PopUpChildOverview from '../components/PopUps/PopUpChildOverview';
import ChatComponent from '../components/ChatComponent/ChatComponent';

export default function ChildOverviewPage() {
  const [isPopupVisible, setPopupVisible] = useState(true); 

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverviewRequests title= "Child Overview" />
                <PopUpChildOverview isVisible={isPopupVisible} onClose={togglePopup}/>
        <BlurredComponent isBlurred={isPopupVisible}><ChatComponent/>
        </BlurredComponent>
      </ColumnContainer>
    </div>
  );
}

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;

const BlurredComponent = styled.div`
  filter: ${({ isBlurred }) => (isBlurred ? 'blur(2px)' : 'none')}; 
`;