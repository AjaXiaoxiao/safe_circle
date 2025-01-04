import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import ChildItem from "./ChildItem";
import colors from "../assets/colors";

const ChildrenList = ({ onChildClick, selectedContact }) => {
  const [children, setChildren] = useState([]);
  const [requestsByChild, setRequestsByChild] = useState({});
  const [error, setError] = useState(null);

  const fetchChildrenAndRequests = async () => {
    try {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        throw new Error("No user is currently logged in.");
      }
      const ownerEmail = currentUser.get("email");
      // fetch owner profile
      const ownerQuery = new Parse.Query("UserProfile");
      const owner = await ownerQuery.equalTo("email", ownerEmail).first();
      if (!owner) {
        throw new Error("Owner profile not found for the logged-in user.");
      }

      // fetch children profiles
      const childrenQuery = new Parse.Query("UserProfile");
      childrenQuery.equalTo("guardianEmail", ownerEmail);
      const childrenList = await childrenQuery.find();
      setChildren(childrenList);

      // fetch requests for each child
      const usernames = childrenList.map((child) => child.get("username"));
      const allRequests = {};

      for (const username of usernames) {
        const userQuery = new Parse.Query("UserProfile");
        userQuery.equalTo("username", username);

        const child = await userQuery.first();
        if (child) {
          const requestQuery = new Parse.Query("Requests");
          requestQuery.include("child");
          requestQuery.equalTo("child", child);
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

  return (
    <ChildrenListContainer>
      {children.length > 0 ? (
        children.map((child) => {
          const username = child.get("username");
          const childRequests = requestsByChild[username] || [];

          return (
            <ChildItem
              key={child.id}
              onChildClick={() => onChildClick(child, childRequests)}
              username={username}
              guardianEmail={child.get("guardianEmail")}
              isSelected={selectedContact === username}
              requests={childRequests}
            />
          );
        })
      ) : (
        <NoChildrenMessage>
          You don't have any children using SafeCircle.
        </NoChildrenMessage>
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
