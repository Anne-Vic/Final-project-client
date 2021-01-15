import React from "react";
import { NavLink } from "react-router-dom";

const NavBottom = () => {

  return (
    <nav className="NavBottom">
<NavLink exact to="/myprofile" className="link"><i className="fas fa-user-circle"></i></NavLink>
<NavLink exact to="/events/create" className="link"><i className="fas fa-plus-circle"></i></NavLink>
<NavLink exact to="/events/alert" className="link"><i className="fas fa-bell"></i></NavLink>
<NavLink exact to="/" className="link"><i className="fas fa-comments"></i></NavLink>
<NavLink exact to="/more" className="link"><i className="fas fa-bars"></i></NavLink>
    </nav>
  );
};

export default NavBottom;
