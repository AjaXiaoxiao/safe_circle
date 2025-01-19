import React from "react";
import { Navigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

//One example of a child that is passed to the RequireLogin component is ChildOverview for instance
//Another example of destructuring. children is destructured from the rest of the props,
//and the syntax for this is  { }
const RequireLogin = ({ children }) => {
  const isLoggedIn = Parse.User.current();
  //Navigate is used for redirecting to the path assigned to to. Without replace the
  //user would be able to go back to the path that the user is not authenticated to do.
  if (!isLoggedIn) {
    return <Navigate to="/userlogin" replace />;
  }
  //we return the child such as Childovewview if we can find the logged in user
  return children;
};

export default RequireLogin;
