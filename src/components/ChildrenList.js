import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse/dist/parse.min.js";
import ChildItem from "./ChildItem";
import colors from "../assets/colors";

const ChildrenList = ({ onChildClick, selectedContact }) => {
  const [children, setChildren] = useState([]);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchChildrenAndRequests = async () => {
      try {

        const currentUser = Parse.User.current();
        if (!currentUser) {
          throw new Error("No user is currently logged in.");
        }
        const ownerEmail = currentUser.get("email");
        const ownerQuery = new Parse.Query("UserProfile");
        const owner = await ownerQuery.equalTo("email", ownerEmail).first();

        if (!owner) {
          throw new Error("Owner profile not found for the logged-in user.");
        }

  
        const childrenQuery = new Parse.Query("UserProfile");
        childrenQuery.equalTo("guardianEmail", ownerEmail); 
        const childrenList = await childrenQuery.find();
        console.log("childrenList", childrenList);
        setChildren(childrenList);

        const requestQuery = new Parse.Query("Requests");
        requestQuery.equalTo("Parent", owner); 
        requestQuery.equalTo("Status", "Pending"); 
        const pendingRequests = await requestQuery.find();

        console.log("Pending Requests:", pendingRequests);

        setRequests(pendingRequests); 

      } catch (error) {
        console.error("Error fetching children or requests:", error);
        setError("Failed to fetch data.");
      }
    };

    fetchChildrenAndRequests();
  }, []);

  const handleChildClick = (child) => {
    const childRequests = requests.filter((request) => {
      const requestChild = request.get("child");
      return requestChild?.id === child.id;
    });
  
    const pendingChildApprovalRequests = childRequests.filter(
      (req) => req.get("Type") === "ChildApproval" && req.get("Status") === "Pending"
    );
  
    const pendingContactApprovalRequests = childRequests.filter(
      (req) => req.get("Type") === "ContactApproval" && req.get("Status") === "Pending"
    );
  
    if (pendingChildApprovalRequests.length > 0) {
      onChildClick(child, pendingChildApprovalRequests, "ChildApproval");
    } else if (pendingContactApprovalRequests.length > 0) {
      onChildClick(child, pendingContactApprovalRequests, "ContactApproval");
    } else {
      alert("No pending requests for this child.");
    }
  };
 
  return (
    <ChildrenListContainer>
      {children.length > 0 ? (
        children.map((child) => {
          const childRequests = requests.filter((request) => {
            const requestChild = request.get("child");
            return requestChild?.id === child.id;
          });
  
          return (
            <ChildItem
              key={child.id}
              onChildClick={() => handleChildClick(child)}
              username={child.get("username")}
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
    </ChildrenListContainer>
  )};
  
  
export default ChildrenList;


const ChildrenListContainer = styled.div`
  padding: 0px;
  overflow-y: auto;
  height: 100%;
`;

const NoChildrenMessage = styled.p`
  text-align: center;
  color: ${colors.grey};
`;
