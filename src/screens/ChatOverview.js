import Topbar from "../components/Topbar/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar/Sidebar";

const ColumnContainer = styled.div``;
export default function ChatOverview() {
  return (
    <div>
      <Topbar />
      <ColumnContainer />
    </div>
  );
}
