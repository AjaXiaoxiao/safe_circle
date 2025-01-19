import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import ChildItem from "./ChildItem";
import colors from "../assets/colors";
import { useListReload } from "../contexts/ListReloadContext";

const ChildrenList = ({ onChildClick, selectedContact }) => {
  const [children, setChildren] = useState([]);
  const [requestsByChild, setRequestsByChild] = useState({});
  const { reloadChildrenList } = useListReload();

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

      // fetch children profiles that have the logged in user as their guardian
      const childrenQuery = new Parse.Query("UserProfile");
      childrenQuery.equalTo("guardianEmail", ownerEmail);
      const childrenList = await childrenQuery.find();
      setChildren(childrenList);

      // fetch requests for each child
      //usernames contains all the usernames of the children
      const usernames = childrenList.map((child) => child.get("username"));
      //Prepared an object allReqests
      const allRequests = {};

      for (const username of usernames) {
        const userQuery = new Parse.Query("UserProfile");
        userQuery.equalTo("username", username);

        //finds each child in userprofile
        const child = await userQuery.first();
        //if the child exists
        if (child) {
          //we want to find all requests connected to the child
          const requestQuery = new Parse.Query("Requests");
          //include tells Parse to fetch and include related data from another class table.
          //without include the query would only return a reference to the related object,
          //not the full object.
          requestQuery.include("child");
          requestQuery.equalTo("child", child);
          requestQuery.equalTo("Status", "Pending");
          //we are both fetching the full contact object the child wants to add
          //as well
          requestQuery.include("requestContact");
          //we also find the full user profile of the request contact
          requestQuery.include("requestContact.ContactUserProfile");
          //finds all the pending request connected to the child
          const childRequests = await requestQuery.find();
          //stores all the requests under a key corresponding to the child's username
          allRequests[username] = childRequests;
        } else {
          console.error(`No user found with username: ${username}`);
        }
      }

      setRequestsByChild(allRequests);
    } catch (error) {
      console.error("Error fetching children or requests:", error);
    }
  };

  useEffect(() => {
    fetchChildrenAndRequests();
  }, [reloadChildrenList]);
  //first we loop through all children
  return (
    <ChildrenListContainer>
      {children.length > 0 ? (
        children.map((child) => {
          const username = child.get("username");
          const childRequests = requestsByChild[username] || [];
          //childRequests are all the requests from one child
          //these are being passed to the function when one click on a child
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
