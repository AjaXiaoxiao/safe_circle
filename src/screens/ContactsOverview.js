import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import SelectContact from "../components/PopUps/SelectContact";
import PopUpAddNewContact from "../components/PopUps/PopUpAddNewContact";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contacts({
  selectedChat,
  setSelectedChat,
  currentReceiverId,
}) {
  const [isAddContactPopupVisible, setAddContactPopUpToVisible] = useState(false);
  const [isSelectContactPopupVisible, setSelectContactPopUpToVisible] = useState(false);
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

    const displayToast = (type, message) => {
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    };

  return (
    <div>
      <ToastContainer />
      <Topbar />
      <ColumnContainer>
        <Sidebar 
        displayToast={displayToast}
        />
        <SideOverview
          title="Contacts"
          onAddClick={handleOpenAddContactPopup}
          onContactClick={handleContactClick}
          selectedContact={selectedContact}
        />
        <BlurredComponent isBlurred={isAnyPopupVisible}>
          <ChatComponent
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            currentReceiverId={currentReceiverId}
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
