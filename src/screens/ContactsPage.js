import React, { useState } from 'react'; // Import useState
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import SelectContact from "../components/PopUps/SelectContact";

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;

export default function ContactsPage() {
  // Set isVisible to true to show the SelectContact popup by default
  const [isPopupVisible, setPopupVisible] = useState(true); // Set to true to show by default

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview title="Contacts" />
                <SelectContact 
          isVisible={isPopupVisible} 
          onClose={() => setPopupVisible(false)} // Add onClose function to hide the popup
        />
      </ColumnContainer>
    </div>
  );
}