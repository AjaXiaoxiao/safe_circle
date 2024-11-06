import React, { useState } from 'react'; // Import useState
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverviewRequests from "../components/SideOverviewRequests";
import PopUpChildOverview from '../components/PopUps/PopUpChildOverview';
import ChatComponent from '../components/ChatComponent/ChatComponent';

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;

const BlurredComponent = styled.div`
  filter: blur(2px); 
`;
export default function ChildOverviewPage() {
  const [isPopupVisible] = useState(true); 

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverviewRequests title= "Child Overview" />
                <PopUpChildOverview isVisible={isPopupVisible}/>
        <BlurredComponent><ChatComponent/>
        </BlurredComponent>
      </ColumnContainer>
    </div>
  );
}