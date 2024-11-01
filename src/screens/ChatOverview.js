import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";

const ChatOverviewContainer = styled.div``;
const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;
export default function ChatOverview({ title }) {
  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview title={title} />
        <ChatComponent />
      </ColumnContainer>
    </div>
  );
}
