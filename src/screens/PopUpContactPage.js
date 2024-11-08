import React, { useState } from 'react'; 
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverviewContacts from "../components/SideOverviewContacts";
import SelectContact from "../components/PopUps/SelectContact";
import ChatComponent from '../components/ChatComponent/ChatComponent';


export default function PopUpContactPage() {
  // Set isVisible to true to show the SelectContact popup by default
  const [isPopupVisible] = useState(true); // Set to true to show by default

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverviewContacts title= "Contacts" />
                <SelectContact isVisible={isPopupVisible}/>
                <BlurredComponent> <ChatComponent/>
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
  filter: blur(2px); 
`;
