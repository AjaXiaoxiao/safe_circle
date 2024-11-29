import styled from "styled-components";
import SideOverviewHeader from "./SideOverviewHeader";
import colors from "../assets/colors";
import { useLocation } from "react-router-dom";
import ContactList from "./ContactList";
import ChatList from "./ChatList";

const SideOverview = ({ title, onAddClick, onContactClick }) => {
  const location = useLocation();

  
  //i let the childoverview page keep the contacts logic until someone starts to work on it.
  const isContactList = location.pathname === "/ContactsOverview" || location.pathname === "/ChildOverview";
  const isChatList = location.pathname === "/";

  return (
    <OverviewContainer>
      <SideOverviewHeader onAddClick={onAddClick} title={title} />
      {isChatList && <ChatList />}
      {isContactList && <ContactList onContactClick={onContactClick} />}
    </OverviewContainer>
  );
};
export default SideOverview;

const OverviewContainer = styled.div`
  background-color: ${colors.white};
  border: solid ${colors.grey} 1px;
  width: 30vw;
  height: 88vh;
  border-top-left-radius: 20px;
  margin-top: 12vh;
  z-index: 10;
  overflow-y: auto;
`;
