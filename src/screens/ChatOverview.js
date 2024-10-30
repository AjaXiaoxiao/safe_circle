import Topbar from "../components/Topbar/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar/Sidebar";

const ChatOverviewContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 12vh);
`;

const SidebarContainer = styled(Sidebar)`
  width: 80px; /* Fixed width for the sidebar */
`;

export default function ChatOverview() {
  return (
    <ChatOverviewContainer>
      <Topbar />
      <ColumnContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
      </ColumnContainer>
    </ChatOverviewContainer>
  );
}
