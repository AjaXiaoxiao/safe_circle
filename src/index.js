import React from "react";
//ensures we can render react components to the DOM
import ReactDOM from "react-dom/client";
import App from "./App";
//this we have not used I think.
import "bootstrap/dist/css/bootstrap.min.css";

//explains where to render the react application inside the root div in the index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
//decides what should be rendered, and that it should be in StrictMode, helping you to debug
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
