import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import SelectContact from "../components/PopUps/SelectContact";
import PopUpAddNewContact from "../components/PopUps/PopUpAddNewContact";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Contacts({ selectedChat, setSelectedChat }) {
  const [isAddContactPopupVisible, setAddContactPopUpToVisible] =
    useState(false);
  const [isSelectContactPopupVisible, setSelectContactPopUpToVisible] =
    useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const location = useLocation();

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setSelectContactPopUpToVisible(true);
  };

  const handleOpenAddContactPopup = () => {
    if (location.pathname === "/ContactsOverview") {
      setAddContactPopUpToVisible(true);
    }
  };

  const handleClosePopup = () => {
    setAddContactPopUpToVisible(false);
    setSelectContactPopUpToVisible(false);
    setSelectedContact(null);
  };

  const isAnyPopupVisible =
    isAddContactPopupVisible || isSelectContactPopupVisible;

  return (
    <div>
      <Topbar />
      <ColumnContainer>
        <Sidebar />
        <SideOverview
          title="Contacts"
          onAddClick={handleOpenAddContactPopup}
          onContactClick={handleContactClick}
        />
        <BlurredComponent isBlurred={isAnyPopupVisible}>
          <ChatComponent
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </BlurredComponent>
      </ColumnContainer>

      {isAddContactPopupVisible && (
        <PopUpAddNewContact
          onClick={handleOpenAddContactPopup}
          onClose={handleClosePopup}
          isVisible={isAddContactPopupVisible}
        />
      )}

      {isSelectContactPopupVisible && (
        <SelectContact
          isVisible={isSelectContactPopupVisible}
          onClose={handleClosePopup}
          contact={selectedContact}
        />
      )}
    </div>
  );
}

const BlurredComponent = styled.div`
  filter: ${({ isBlurred }) => (isBlurred ? "blur(2px)" : "none")};
`;

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;
