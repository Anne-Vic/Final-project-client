import React from "react";
import { NavLink } from "react-router-dom";

const NavBottom = () => {

  return (
    <nav className="NavBottom">
<NavLink exact to="/" className="link"><i class="fas fa-user-circle"></i></NavLink>
<NavLink exact to="/" className="link"><i class="fas fa-plus-circle"></i></NavLink>
<NavLink exact to="/" className="link"><i class="fas fa-bell"></i></NavLink>
<NavLink exact to="/" className="link"><i class="fas fa-comments"></i></NavLink>
<NavLink exact to="/" className="link"><i class="fas fa-bars"></i></NavLink>
    </nav>
  );
};

export default NavBottom;
