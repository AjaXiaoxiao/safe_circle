import React, { useState } from 'react'; 
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverviewContacts from "../components/SideOverviewContacts";
import SelectContact from "../components/PopUps/SelectContact";
import ChatComponent from '../components/ChatComponent/ChatComponent';

export default function PopUpContactPage() {
  const [isPopupVisible, setPopupVisible] = useState(true); //setting this to true means the pop up is open by default

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverviewContacts title= "Contacts" />
                <SelectContact isVisible={isPopupVisible} onClose={togglePopup}/>
                <BlurredComponent isBlurred={isPopupVisible}> <ChatComponent/>
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

