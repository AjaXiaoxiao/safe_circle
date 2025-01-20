import { useState, useEffect } from "react";

export const usePopUpManager = (pathname, setIsAnyPopupVisible) => {
  // state for all popups
  const [isAddNewContactPopupVisible, setIsAddNewContactPopupVisible] =
  useState(false);  
  const [isContactRequestPopupVisible, setIsContactRequestPopupVisible] = 
    useState(false);
  const [isChildApprovalPopupVisible, setIsChildApprovalPopupVisible] =
    useState(false);
  const [isSelectContactPopupVisible, setIsSelectContactPopupVisible] =
    useState(false);
  const [isRegistrationPopupVisible, setIsRegistrationPopupVisible] = useState(false); 
  const [isChildAwaitPopupVisible, setIsChildAwaitPopupVisible] = useState(false); 

  const [selectedContact, setSelectedContact] = useState(null);
  const [contactRequestData, setContactRequestData] = useState([]);
  const [contactRequestDetails, setContactRequestDetails] = useState(null);
  const [childApprovalRequests, setChildApprovalRequests] = useState([]);
  const [childApprovalDetails, setChildApprovalDetails] = useState(null);

  //derived state to check if visible
  const isAnyPopupVisible =
    isAddNewContactPopupVisible ||
    isContactRequestPopupVisible ||
    isChildApprovalPopupVisible ||
    isSelectContactPopupVisible ||
    isRegistrationPopupVisible ||
    isChildAwaitPopupVisible;

  // side effect to update setIsAnyPopupVisible
  useEffect(() => {
    if (setIsAnyPopupVisible) {
      setIsAnyPopupVisible(isAnyPopupVisible);
    }
  }, [isAnyPopupVisible, setIsAnyPopupVisible]);

  // handlers for popups
  const handleChildAwaitClick = () => {
    setIsChildAwaitPopupVisible(true);
  };  

  const handleRegistrationClick = () => {
    setIsRegistrationPopupVisible(true); 
  };

  const handleAddContactClick = () => {
    if (pathname === "/ContactsOverview") {
      setIsAddNewContactPopupVisible(true); 
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    if (pathname === "/ContactsOverview") {
      setIsSelectContactPopupVisible(true);
    }
  };

  const handleChildClick = (child, requests) => {
    const childApprovalRequests = requests.filter(
      (req) => req.get("Type") === "ChildApproval"
    );
    const contactApprovalRequests = requests.filter(
      (req) => req.get("Type") === "ContactApproval"
    );

    if (childApprovalRequests.length > 0) {
      const firstRequest = childApprovalRequests[0];
      const childData = firstRequest.get("child"); 
      setChildApprovalDetails(childData); //set setails to the childs details
      setChildApprovalRequests(childApprovalRequests);
      setIsChildApprovalPopupVisible(true);
    } else if (contactApprovalRequests.length > 0) {
      const firstRequest = contactApprovalRequests[0];
      const requestContact = firstRequest.get("requestContact");

      if (requestContact) {
        const contactUserProfile = requestContact.get("ContactUserProfile");
        setContactRequestDetails({
          name: contactUserProfile?.get("username") || "",
          email: contactUserProfile?.get("email") || "",
          about: requestContact.get("about") || "",
        });
        setContactRequestData(contactApprovalRequests);
        setIsContactRequestPopupVisible(true);
      }
    }
  };

  const closeAllPopups = () => {
    setIsAddNewContactPopupVisible(false);
    setIsContactRequestPopupVisible(false);
    setIsChildApprovalPopupVisible(false);
    setIsSelectContactPopupVisible(false);
    setIsRegistrationPopupVisible(false);
    setIsChildAwaitPopupVisible(false); 
    setSelectedContact(null);
    setContactRequestData([]);
    setContactRequestDetails(null);
    setChildApprovalRequests([]);
    setChildApprovalDetails(null);
  };

  return {
    // popup states
    isAddNewContactPopupVisible,
    isContactRequestPopupVisible,
    isChildApprovalPopupVisible,
    isSelectContactPopupVisible,
    isRegistrationPopupVisible,
    isChildAwaitPopupVisible,
    selectedContact,
    contactRequestData,
    contactRequestDetails,
    childApprovalRequests,
    childApprovalDetails,

    // true if a popup is visible else false
    isAnyPopupVisible,

    // pop up handlers
    handleAddContactClick,
    handleRegistrationClick,
    handleChildAwaitClick,
    handleContactClick,
    handleChildClick,
    closeAllPopups,
  };
};
