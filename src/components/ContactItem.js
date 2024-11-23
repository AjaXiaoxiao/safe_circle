import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import PendingIcon from "./Notifications/PendingIcon";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Get the currently logged-in user
        const currentUser = Parse.User.current();
        if (!currentUser) {
          throw new Error("No user is logged in.");
        }

        // Get the current user's contact list
        const contactListQuery = new Parse.Query("ContactList");
        contactListQuery.equalTo("UserPointer", currentUser); //filter by UserPointer to match the current user
        const contactList = await contactListQuery.first();

        if (!contactList) {
          throw new Error("No ContactList found for the current user.");
        }

        // Get the array of Contacts from the ContactList table 
        const contactPointers = contactList.get("Contacts") || [];

        if (contactPointers.length === 0) {
          setContacts([]);
          return;
        }

      
        const resolvedContacts = await Promise.all(
          contactPointers.map(async (pointer) => {
            const contactQuery = new Parse.Query("Contact");
            const contact = await contactQuery.get(pointer.id); // Fetch the Contact object by ID

            // resolve the ContactUserProfile pointer to get the username and email
            const contactUserProfile = contact.get("ContactUserProfile");
            let username = "No username";
            let email = "No email";

            if (contactUserProfile) {
              username = contactUserProfile.get("username");
              email = contactUserProfile.get("email");
            }

            return {
              username,
              email,
              about: contact.get("about") || "", 
            };
          })
        );

        setContacts(resolvedContacts);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError(err.message || "Failed to fetch contacts.");
      }
    };

    fetchContacts();
  }, []); // This effect runs once on component mount

  const showMessage = location.pathname === "/";
  const isRequest = location.pathname === "/ChildOverview";

  return (
    <Container>
      {error && <ErrorText>{error}</ErrorText>}
      {!error && contacts.length === 0 && <LoadingText>No contacts available.</LoadingText>}
      {!error &&
        contacts.map((contact, index) => (
          <ContactItem
            key={index}
            username={contact.username}
            email={contact.email}
            showMessage={showMessage}
            isRequest={isRequest}
          />
        ))}
    </Container>
  );
};

export default ContactList;

const ContactItem = ({ username, email, showMessage, isRequest }) => {
  return (
    <Item>
      <ProfileContainer>
        <ProfilePictureSmall />
      </ProfileContainer>
      <TextContainer>
        <Name>{username}</Name>
        <Email>{email}</Email>
        {showMessage && <MessageText>{"Hello. How are you doing.."}</MessageText>}
        {isRequest && <PendingIcon />}
      </TextContainer>
    </Item>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ProfileContainer = styled.div`
  margin-right: 15px;
`;

const TextContainer = styled.div`
  flex-grow: 1;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 1.2em;
`;

const Email = styled.div`
  font-size: 0.9em;
  color: #666;
`;

const MessageText = styled.p`
  font-size: 0.9em;
  color: #333;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 1.2em;
`;

const LoadingText = styled.div`
  font-size: 1.2em;
  color: #999;
`;




// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useLocation } from "react-router-dom";
// import Parse from "parse/dist/parse.min.js";
// import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
// import PendingIcon from "./Notifications/PendingIcon";

// const ContactList = () => {
//   const [contacts, setContacts] = useState([]);
//   const [error, setError] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const query = new Parse.Query("ContactList"); 
//         const results = await query.find();
//         const fetchedContacts = results.map((contact) => ({
//           username: contact.get("username"),
//         }));
//         setContacts(fetchedContacts); 
//       } catch (error) {
//         console.error("Error fetching contacts:", error);
//         setError("Failed to fetch contact.");
//       }
//     };

//     fetchContacts();
//   }, []);

//   const showMessage = location.pathname === "/"; 
//   const isRequest = location.pathname === "/ChildOverview";

//   return (
//     <div>
//     {!error && contacts.length === 0 && <p>Loading...</p>}
//     {!error &&
//       contacts.length > 0 &&
//       contacts.map((contact, index) => (
//         <ContactItem
//           key={index}
//           username={contact.username}
//           message={contact.message}
//           showMessage={showMessage}
//           isRequest={isRequest}
         
//         />
//       ))}
//     </div>
//   );
// };

// export default ContactList;


// const ContactItem = ({ username, message, showMessage, isRequest }) => {
//   return (
//     <Item>
//       <ProfileContainer>
//         <ProfilePictureSmall />
//       </ProfileContainer>
//       <TextContainer>
//         <Name>{username}</Name>
//         {showMessage && <MessageText>{message || "Hello. How are you doing.."}</MessageText>}
//         {isRequest &&  <PendingIcon/>}
//       </TextContainer>
//     </Item>
//   );
// };

// const Item = styled.div`
//   height: 110px;
//   width: 100%;
//   background-color: #ffffff;
//   border-top: 1px solid #ccc;
//   border-bottom: 1px solid #ccc;
//   display: flex;
//   align-items: center;
// `;

// const ProfileContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: 20px;
// `;

// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   text-align: left;
//   margin-left: 25px;
//   margin-top: 10px;
// `;

// const Name = styled.div`
//   font-size: 1.2em;
//   font-weight: bold;
// `;

// const MessageText = styled.p`
//   font-size: 0.9em;
// `;
