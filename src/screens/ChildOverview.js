import React, { useState } from "react";
import Topbar from "../components/Topbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SideOverview from "../components/SideOverview";
import PopUpChildOverview from "../components/PopUps/PopUpChildOverview";
import ChatComponent from "../components/ChatComponent/ChatComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChildOverviewPage() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleChildClick = (child, requests, requestType) => {
    setSelectedContact({ child, requests, requestType });
    setPopupVisible(true);
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
    setSelectedContact(null);
  };

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
        <Sidebar displayToast={displayToast} />

        <SideOverview
          title="Child Overview"
          onChildClick={handleChildClick} // Pass this function
          selectedContact={selectedContact}
        />

        {/* PopUpChildOverview Component */}
        {selectedContact && (
          <PopUpChildOverview
            isVisible={isPopupVisible}
            onClose={togglePopup}
            contact={selectedContact} // Pass child and requests
            displayToast={displayToast}
          />
        )}

        <BlurredComponent isBlurred={isPopupVisible}>
          <ChatComponent />
        </BlurredComponent>
      </ColumnContainer>
    </div>
  );
}

const ColumnContainer = styled.div`
  display: flex;
  width: 100vw;
`;

const BlurredComponent = styled.div`
  filter: ${({ isBlurred }) => (isBlurred ? "blur(2px)" : "none")};
`;
