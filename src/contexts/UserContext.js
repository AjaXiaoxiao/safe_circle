import React, { createContext, useContext, useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const [userProfile, setUserProfile] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        setIsLoading(true);
        const user = Parse.User.current();
        if (!user) {
          throw new Error("No user is currently logged in.");
        }
        setLoggedInUser(user);

        const userProfileQuery = new Parse.Query("UserProfile");
        userProfileQuery.equalTo("userPointer", user);
        const profile = await userProfileQuery.first();

        if (!profile) {
          throw new Error("No profile found for the logged-in user.");
        }

        setUserProfile(profile);
      } catch (err) {
        setError(err.message || "Failed to fetch user information.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoggedInUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        userProfile,
        isLoading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
