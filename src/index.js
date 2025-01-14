import React from "react";
//ensures we can render react components to the DOM
import ReactDOM from "react-dom/client";
import App from "./App";
//this we have not used I think.
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
