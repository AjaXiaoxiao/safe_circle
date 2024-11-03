import Sidebar from "../components/Sidebar.js";
import Topbar from "./Topbar.js";
import styled from "styled-components";

function TopAndSideBar() {
  return (
    <AppContainer>
      <Sidebar />
      <Topbar />
    </AppContainer>
  );
}

export default TopAndSideBar;

// Styled components for layout
const AppContainer = styled.div`
  display: flex;
  position: fixed;
  height: 100vh;
  width: 100vw;
`;
