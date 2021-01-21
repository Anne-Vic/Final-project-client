import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";

import "../styles/NavBar.css";

const NavTop = (props) => {
  const { context } = props;

  return (
    <nav className="NavTop">
      {context.isLoggedIn && (
        <NavLink exact to="/events" className="link">
          <i className="fas fa-home"></i>
        </NavLink>
      )}
      {!context.isLoggedIn && <h1>Fit Club</h1>}
    </nav>
  );
};

export default withUser(NavTop);
