import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import ChildItem from "./ChildItem";
import PopUpContactRequest from "../components/PopUps/PopUpContactRequest.js";
import colors from "../assets/colors";

const ChildrenList = ({ onChildClick, selectedContact, username }) => {
  const [children, setChildren] = useState([]);
  const [requestsByChild, setRequestsByChild] = useState({});
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalRequests, setModalRequests] = useState([]);

  useEffect(() => {
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
            requestQuery.include("Status");

            const childRequests = await requestQuery.find();
            allRequests[username] = childRequests;
          } else {
            console.error(`No user found with username: ${username}`);
          }
        }

        console.log("allRequests", allRequests);
        setRequestsByChild(allRequests);
      } catch (error) {
        console.error("Error fetching children or requests:", error);
        setError("Failed to fetch data.");
      }
    };

    fetchChildrenAndRequests();
  }, []);

  const handleChildClick = (username) => {
    const childRequests = requestsByChild[username] || [];
// Start Debugging from here!! 
    if (childRequests.length > 0) {
      setModalRequests(childRequests);
      setShowModal(true); // Open the modal
    } else {
      alert("No pending requests for this child.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalRequests([]);
  };

  return (
    <ChildrenListContainer>
      {children.length > 0 ? (
        children.map((child) => {
          const username = child.get("username");
          const childRequests = requestsByChild[username] || [];
          console.log("childRequest", childRequests)

          return (
            <ChildItem
              key={child.id}
              onChildClick={() => handleChildClick(childRequests)}
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
        <PopUpContactRequest onClose={handleModalClose}>
          <h2>Pending Requests</h2>
          <ul>
            {modalRequests.map((request) => (
              <li key={request.id}>
                <p>{request.get("info")}</p>
                <button
                  onClick={() => {
                    request.set("Status", "Approved");
                    request.save();
                    alert("Request Approved!");
                    handleModalClose();
                  }}
                >
                  Approve
                </button>
              </li>
            ))}
          </ul>
        </PopUpContactRequest>
      )}
    </ChildrenListContainer>
  );
};

export default ChildrenList;

// Styled components
const ChildrenListContainer = styled.div`
  /* Add your styles here */
`;

const NoChildrenMessage = styled.p`
  color: ${colors.grey};
`;