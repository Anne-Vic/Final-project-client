import React from "react";
import "../styles/global.css";

export default function PopUp({ handlePopUp }) {
  return (
    <div className="popup" onClick={handlePopUp}>
      <p>
        Awesome feature for sure !<br></br> It's coming soon !
      </p>
    </div>
  );
}
