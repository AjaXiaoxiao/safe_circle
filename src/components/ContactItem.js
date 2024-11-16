import styled from "styled-components";
import ProfilePictureSmall from "./ProfilePictures/ProfilePictureSmall";
import SideOverviewHeader from "./SideOverviewHeader"
import Parse from "parse";
import React, { useEffect, useState } from "react";

 /*async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query("Person");
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    query.equalTo("name", "John");
    // run the query
    const Person = await query.first();
    // access the Parse Object attributes
    console.log("person name: ", Person.get("name"));
    console.log("person email: ", Person.get("email"));
    console.log("person id: ", Person.id);
    setPerson(Person);
  }*/

const ContactItem = () => {
      // State variables
  const [person, setPerson] = useState(null);

  async function fetchPerson() {
    try {
      // Create a query for the Person table
      const query = new Parse.Query("Person");

      // Fetch the person with a specific name (you can adjust this filter as needed)
      query.equalTo("name", "Johnnyyy");

      const person = await query.first();

      if (person) {
        console.log("Person fetched:", person);
        setPerson(person);
      } else {
        console.warn("No person found with the specified name.");
        setPerson(null);
      }
    } catch (error) {
      console.error("Error fetching person:", error);
      setPerson(null);
    }
  }

  // Fetch person when the component loads
  useEffect(() => {
    fetchPerson();
  }, []);

  return (
    <Item>
        <ProfileContainer>
            <ProfilePictureSmall />
        </ProfileContainer>
        <TextContainer>
            <Name>Aja</Name>
            <MessageText>Hello. How are you doing..</MessageText>
        </TextContainer>
    </Item>
  );
};
export default ContactItem;

const Item = styled.div`
  height: 110px;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px; 
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-left: 25px;
  margin-top: 10px;
`;

const Name = styled.div`
  font-size: 1.4 em;
  font-weight: bold;
`;

const MessageText = styled.p`
  font-size: 0.9em;
`;