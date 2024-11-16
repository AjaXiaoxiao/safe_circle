import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import PopUpChildOverview from "../components/PopUps/PopUpChildOverview";
import styled from "styled-components";

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;

const ChildOverviewPage = () => {
  const [selectedChild, setSelectedChild] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [clearSelection, setClearSelection] = useState(false);

  const handleChildClick = (childName) => {
    setSelectedChild(childName); 
    setIsPopupVisible(true); 
    setClearSelection(false); 
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false); 
    setSelectedChild(null); 
    setClearSelection(true); 
  };

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview 
          title="Child Overview" 
          onContactClick={handleChildClick} 
          context="ChildOverview" 
          clearSelection={clearSelection} 
        />
      </ColumnContainer>
      {isPopupVisible && (
        <PopUpChildOverview 
          isVisible={isPopupVisible} 
          onClose={handleClosePopup} 
          childName={selectedChild} 
        />
      )}
    </div>
  );
};

export default ChildOverviewPage;
