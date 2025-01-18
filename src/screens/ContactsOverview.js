import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import { useState } from "react";

export default function Contacts() {
  const [isAnyPopupVisible, setIsAnyPopupVisible] = useState(false);

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview
          title="Contacts"
          setIsAnyPopupVisible={setIsAnyPopupVisible}
        />
        <BlurredComponent $isBlurred={isAnyPopupVisible}>
          <ChatComponent />
        </BlurredComponent>
      </ColumnContainer>
    </div>
  );
}

const BlurredComponent = styled.div`
  filter: ${({ $isBlurred }) => ($isBlurred ? "blur(2px)" : "none")};
`;

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;
