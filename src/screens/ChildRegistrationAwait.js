import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PopUpSignedIn from "../components/PopUps/PopUpSignedIn";
import Topbar from "../components/Topbar";
import { useToast } from "../contexts/ToastContext";
import { usePopUpManager } from "../components/Hooks/usePopUpManager";

const ChildRegistrationAwait = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { displayToast } = useToast();
  const { isChildAwaitPopupVisible, handleChildAwaitClick } = usePopUpManager();

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
      displayToast("success", "Approval request sent to guardian!");
      handleChildAwaitClick();
    } else {
      navigate("/userlogin");
    }
  }, [location.state, navigate, handleChildAwaitClick]);
  //pretty sure we only need location.state here

  const closePopup = () => {
    handleChildAwaitClick();
    navigate("/userlogin");
  };

  return (
    <div>
      <Topbar />
      {isChildAwaitPopupVisible && (
        <PopUpSignedIn
          isVisible={isChildAwaitPopupVisible}
          onClose={closePopup}
          username={username}
          isChild={true}
        />
      )}
    </div>
  );
};

export default ChildRegistrationAwait;
