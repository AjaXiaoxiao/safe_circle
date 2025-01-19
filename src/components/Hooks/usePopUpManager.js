import { useState, useEffect } from "react";

export const usePopUpManager = (pathname, setIsAnyPopupVisible) => {
  // state for all popups
  const [isAddNewContactPopupVisible, setIsAddNewContactPopupVisible] =
    useState(false);
  //pop up for when child have sent a contact request to guardian
  const [isContactRequestPopupVisible, setIsContactRequestPopupVisible] =
    useState(false);
  //Pop up for when child have set an account creation request to guardian
  const [isChildApprovalPopupVisible, setIsChildApprovalPopupVisible] =
    useState(false);
  //Pop up when selecting contact
  const [isSelectContactPopupVisible, setIsSelectContactPopupVisible] =
    useState(false);
  //Registration where you pick what role you want when you register
  const [isRegistrationPopupVisible, setIsRegistrationPopupVisible] =
    useState(false);
  //I think this the popup that shows after a child sucessfully have registered an account
  const [isChildAwaitPopupVisible, setIsChildAwaitPopupVisible] =
    useState(false);

  //The selected contact information
  const [selectedContact, setSelectedContact] = useState(null);
  //
  const [contactRequestData, setContactRequestData] = useState([]);
  //
  const [contactRequestDetails, setContactRequestDetails] = useState(null);
  //
  const [childApprovalRequests, setChildApprovalRequests] = useState([]);
  const [childApprovalDetails, setChildApprovalDetails] = useState(null);

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

  //Is used when handleRegistrationClick is triggered when
  //the user clicks on the register button on the UserLogin page.
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
    //All requests made by children that wish to create an account
    const childApprovalRequests = requests.filter(
      (req) => req.get("Type") === "ChildApproval"
    );
    //All requests made by children that wish to add a contact
    const contactApprovalRequests = requests.filter(
      (req) => req.get("Type") === "ContactApproval"
    );

    if (childApprovalRequests.length > 0) {
      //the first request by a child that wants to create an account
      const firstRequest = childApprovalRequests[0];
      //a pointer to the UserProfile of the child that wants to create an account
      const childData = firstRequest.get("child");
      setChildApprovalDetails(childData);
      setChildApprovalRequests(childApprovalRequests);
      //when this one is set to true the childApprovalPopup shows on the screen
      setIsChildApprovalPopupVisible(true);
    } else if (contactApprovalRequests.length > 0) {
      //the first request by a child that wants to add a contact
      const firstRequest = contactApprovalRequests[0];
      //a pointer to the contact that a child wants to add
      const requestContact = firstRequest.get("requestContact");

      if (requestContact) {
        //Gets the user profile of that contact
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
