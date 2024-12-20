import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PopUpSignedIn from "../components/PopUps/PopUpSignedIn";
import Topbar from "../components/Topbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ChildRegistrationAwait = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
      toast.success("Approval request sent to guardian!");

    } else {
      navigate("/userlogin");
    }
  }, [location.state, navigate]);

  const closePopup = () => {
    setPopupVisible(false);
    navigate("/userlogin");
  };

  return (
    <div>
    <ToastContainer />
    <Topbar /> 
    {isPopupVisible && (
      <PopUpSignedIn
        isVisible={isPopupVisible}
        onClose={closePopup}
        username={username}
        isChild={true}
      />
    )}
  </div>
  );
};

export default ChildRegistrationAwait;
