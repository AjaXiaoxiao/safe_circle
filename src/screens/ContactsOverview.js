import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import { useState } from "react";
//I think we should keep the useState below in both Contacts and Child since we need it to know
//whether the background should be blurredd or not.
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
//in the blurredcomponent above the $ sign is just used to show that it is a prop used for styling
//and does not have a function per say.

//${} lets us work dynamically with JavaScript.
const BlurredComponent = styled.div`
  filter: ${({ $isBlurred }) => ($isBlurred ? "blur(2px)" : "none")};
`;

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;
