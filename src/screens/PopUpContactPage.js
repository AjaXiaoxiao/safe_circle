import React, { useState } from 'react'; // Import useState
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverviewContacts from "../components/SideOverviewContacts";
import SelectContact from "../components/PopUps/SelectContact";
import EmptyChatContainer from '../components/ChatComponent/EmptyChatContainer';

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;

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
        <EmptyChatContainer/>
      </ColumnContainer>
    </div>
  );
}

