import Topbar from "../components/Topbar/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar/Sidebar";
import SideOverview from "../components/SideOverview";

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
      </ColumnContainer>
    </div>
  );
}
