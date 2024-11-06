import React, { useState } from 'react'; // Import useState
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverviewRequests from "../components/SideOverviewRequests";
import EmptyChatContainer from '../components/ChatComponent/EmptyChatContainer';
import PopUpChildOverview from '../components/PopUps/PopUpChildOverview';

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
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
        <EmptyChatContainer/>
      </ColumnContainer>
    </div>
  );
}