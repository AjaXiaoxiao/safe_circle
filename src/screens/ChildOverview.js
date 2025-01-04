import React, { useState } from "react";
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";

export default function ChildOverviewPage() {

const [isAnyPopupVisible, setIsAnyPopupVisible] = useState(false);

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview
          title="Child Overview"
          setIsAnyPopupVisible={setIsAnyPopupVisible}
        />
        <BlurredComponent isBlurred={isAnyPopupVisible}>
        <ChatComponent />
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
  filter: ${({ isBlurred }) => (isBlurred ? "blur(2px)" : "none")};
`;
