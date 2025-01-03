import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import ChildItem from "./ChildItem";
import PopUpContactRequest from "../components/PopUps/PopUpContactRequest.js";
import colors from "../assets/colors";

const ChildrenList = ({ selectedContact }) => {
  const [children, setChildren] = useState([]);
  const [requestsByChild, setRequestsByChild] = useState({});
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalRequests, setModalRequests] = useState([]);
  const [modalData, setModalData] = useState([]);

  // Fetch children and requests
  const fetchChildrenAndRequests = async () => {
    try {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        throw new Error("No user is currently logged in.");
      }
      const ownerEmail = currentUser.get("email");

      // Fetch owner profile
      const ownerQuery = new Parse.Query("UserProfile");
      const owner = await ownerQuery.equalTo("email", ownerEmail).first();
      if (!owner) {
        throw new Error("Owner profile not found for the logged-in user.");
      }

      // Fetch children profiles
      const childrenQuery = new Parse.Query("UserProfile");
      childrenQuery.equalTo("guardianEmail", ownerEmail);
      const childrenList = await childrenQuery.find();
      setChildren(childrenList);

      // Fetch requests for each child
      const usernames = childrenList.map((child) => child.get("username"));
      const allRequests = {};

      for (const username of usernames) {
        const userQuery = new Parse.Query("UserProfile");
        userQuery.equalTo("username", username);

        const child = await userQuery.first();
        if (child) {
          const userPointer = child.get("userPointer");
          const requestQuery = new Parse.Query("Requests");
          requestQuery.equalTo("Child", userPointer);
          requestQuery.equalTo("Status", "Pending");
          requestQuery.include("requestContact");
          requestQuery.include("requestContact.ContactUserProfile");

          const childRequests = await requestQuery.find();
          allRequests[username] = childRequests;
        } else {
          console.error(`No user found with username: ${username}`);
        }
      }

      setRequestsByChild(allRequests);
    } catch (error) {
      console.error("Error fetching children or requests:", error);
      setError("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchChildrenAndRequests();
  }, []);

  const handleChildClick = (username) => {
    const childRequests = requestsByChild[username] || [];
    if (childRequests.length > 0) {
      const firstRequest = childRequests[0];
      const requestContact = firstRequest.get("requestContact");

      if (requestContact) {
        const contactUserProfile = requestContact.get("ContactUserProfile");

        const about = requestContact.get("about") || "Unknown";
        const name = contactUserProfile?.get("username") || "Unknown";
        const email = contactUserProfile?.get("email") || "Unknown";

        setModalData({ name, email, about });
        setModalRequests(childRequests);
        setShowModal(true);
      } else {
        alert("No request contact found for this request.");
      }
    } else {
      alert("No pending requests for this child.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalRequests([]);
    setModalData({});
  };

  return (
    <ChildrenListContainer>
      {children.length > 0 ? (
        children.map((child) => {
          const username = child.get("username");
          const childRequests = requestsByChild[username] || [];

          return (
            <ChildItem
              key={child.id}
              onChildClick={() => handleChildClick(username)}
              username={username}
              guardianEmail={child.get("guardianEmail")}
              isSelected={
                selectedContact &&
                selectedContact.child &&
                selectedContact.child.id === child.id
              }
              requests={childRequests}
            />
          );
        })
      ) : (
        <NoChildrenMessage>
          You don't have any children using SafeCircle.
        </NoChildrenMessage>
      )}

      {showModal && (
        <PopUpContactRequest
          isVisible={showModal}
          onClose={handleModalClose}
          childRequests={modalRequests}
          name={modalData?.name}
          about={modalData?.about}
          email={modalData?.email}
          refreshChildRequests={fetchChildrenAndRequests} // Pass the refresh function
        />
      )}
    </ChildrenListContainer>
  );
};

export default ChildrenList;

const ChildrenListContainer = styled.div`
  padding: 0px;
  overflow-y: auto;
  height: 100%;
`;

const NoChildrenMessage = styled.p`
  text-align: center;
  color: ${colors.grey};
  font-family: "Barlow", serif;
`;
