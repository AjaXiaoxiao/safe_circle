import{ useState } from 'react'; 
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverviewContacts from "../components/SideOverviewContacts";
import ChatComponent from "../components/ChatComponent/ChatComponent";

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;
export default function ChatOverview() {
 
  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverviewContacts title= "Contacts" />
        <ChatComponent />
      </ColumnContainer>
    </div>
  );
}
