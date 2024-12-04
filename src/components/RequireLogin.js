import React from "react";
import { Navigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

const RequireLogin = ({ children }) => {
  const isLoggedIn = Parse.User.current(); 

  if (!isLoggedIn) {
    return <Navigate to="/userlogin" replace />;
  }

  return children; 
};

export default RequireLogin;
