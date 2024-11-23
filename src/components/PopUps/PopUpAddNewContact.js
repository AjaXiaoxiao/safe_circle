import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import styled from "styled-components";
import XButton from "../Buttons/XButton";
import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
import Button from "../Buttons/Button";
import SmallTextField from "../TextFields/SmallTextField";

const PopUpAddNewContact = ({ isVisible, onClose, fetchContacts }) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ username: "", about: "", email: "" });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      // Step 1: Get the current user
      const currentUser = Parse.User.current();
      if (!currentUser) {
        throw new Error("No user is logged in.");
      }

      // Step 2: Create a new contact
      const Contact = Parse.Object.extend("Contact");
      const newContact = new Contact();

      // Set the contact's attributes
      newContact.set("username", formData.username);
      newContact.set("email", formData.email);
      newContact.set("about", formData.about);

      // Save the new contact
      await newContact.save();
      console.log("Contact saved successfully!");

      // Step 3: Add the new contact to the user's contact list
      const ContactList = Parse.Object.extend("ContactList");
      const contactListQuery = new Parse.Query(ContactList);
      contactListQuery.equalTo("UserPointer", currentUser); // Match the logged-in user

      const contactList = await contactListQuery.first();
      if (!contactList) {
        throw new Error("ContactList not found for the current user.");
      }

      // Add the new contact to the 'contacts' array in the ContactList
      const contacts = contactList.get("contacts") || [];
      contacts.push(newContact); // Push the new contact to the list
      contactList.set("contacts", contacts);

      // Save the updated ContactList
      await contactList.save();
      console.log("Contact added to the ContactList!");

      // Reset the form and fetch the updated contacts
      setFormData({ username: "", about: "", email: "" });
      fetchContacts();
      onClose(); // Close the popup after success
    } catch (error) {
      console.error("Error saving contact:", error);
      setError("Failed to save contact.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!isVisible) return null;
  return (
    <PopUpContainer>
      <CloseButton onClick={onClose}>
        <XButton />
      </CloseButton>
      <ProfilePicContainer>
        <ProfilePictureBig />
      </ProfilePicContainer>
      <FormContainer onSubmit={handleFormSubmit}>
        <Label>Name</Label>
        <SmallTextField
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter your name here"
        />

        <Label>About</Label>
        <SmallTextField
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          placeholder="Say something about you"
        />

        <Label>Email</Label>
        <SmallTextField
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Your email here"
        />

        <ButtonContainer>
          <Button
            width="fullWidth"
            title="Add new contact"
            type="submit"
          />
        </ButtonContainer>
      </FormContainer>
      {error && <ErrorText>{error}</ErrorText>} {/* Display error if any */}
    </PopUpContainer>
  );
};

export default PopUpAddNewContact;

const PopUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 450px;
  margin-left: 20%;
  margin-right: 20%;
  background-color: #ffffff;
  color: #000000;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border: 1px solid #ccc;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ProfilePicContainer = styled.div`
  margin-top: 60px;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-items: center;
  margin-top: 30px;
`;

const Label = styled.label`
  font-size: 10px;
  color: #888;
  margin-bottom: 0px;
  align-items: left;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 1em;
  margin-top: 20px;
`;


// import React, { useState} from "react";
// import Parse from "parse/dist/parse.min.js";
// import styled from "styled-components";
// import XButton from "../Buttons/XButton";
// import ProfilePictureBig from "../ProfilePictures/ProfilePictureBig";
// import Button from "../Buttons/Button";

// import SmallTextField from "../TextFields/SmallTextField";

// const PopUpAddNewContact = ({ isVisible, onClose, fetchContacts }) => {
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({ username: "", about: "", email: "" });

//   const handleFormSubmit = async (event) => {
//     console.log("Form submitted with data:", formData);
//     event.preventDefault();
//     try {
//       const ContactList = Parse.Object.extend("ContactList");
//       const newContact = new ContactList();

//       newContact.set("username", formData.username);
//       newContact.set("email", formData.email);
//       newContact.set("about", formData.about);

//       await newContact.save();
//       console.log("Contact saved successfully!");
  
//       setFormData({ username: "", about: "", email: "" });
//       fetchContacts();
//     } catch (error) {
//       console.error("Error saving contact:", error);
//       setError("Failed to save contact.");
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   if (!isVisible) return null;
//   return (
//     <PopUpContainer fetchContact={fetchContacts}>
//       <CloseButton onClick={onClose}>
//         <XButton />
//       </CloseButton>
//       <ProfilePicContainer>
//         <ProfilePictureBig />
//       </ProfilePicContainer>
//       <FormContainer onSubmit={handleFormSubmit}>
//         <Label>Name</Label>
//         <SmallTextField
//           name="username"
//           value={formData.username}
//           onChange={handleInputChange}
//           placeholder="Enter your name here"
//         />

//         <Label>About</Label>
//         <SmallTextField
//           name="about"
//           value={formData.about}
//           onChange={handleInputChange}
//           placeholder="Say something about you"
//         />

//         <Label>Email</Label>
//         <SmallTextField
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           placeholder="Your email here"
//         />

//         <ButtonContainer>
//           <Button
//             width="fullWidth"
//             title="Add new contact"
//             type="submit"
//             onClick={handleFormSubmit}
//           ></Button>
//         </ButtonContainer>
//       </FormContainer>
//     </PopUpContainer>
//   );
// };

// export default PopUpAddNewContact;

// const PopUpContainer = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 340px;
//   height: 450px;
//   margin-left: 20%;
//   margin-right: 20%;
//   background-color: #ffffff;
//   color: #000000;
//   border-radius: 8px;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   z-index: 2;
//   border: 1px solid #ccc;
// `;
// const CloseButton = styled.div`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   cursor: pointer;
// `;

// const ProfilePicContainer = styled.div`
//   margin-top: 60px;
// `;

// const FormContainer = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 0px;
//   align-items: center;
//   margin-top: 30px;
// `;

// const Label = styled.label`
//   font-size: 10px;
//   color: #888;
//   margin-bottom: 0px;
//   align-items: left;
// `;

// const ButtonContainer = styled.div`
//   margin-top: 20px;
//   justify-content: center;
//   width: 100%;
//   align-items: center;
// `;
