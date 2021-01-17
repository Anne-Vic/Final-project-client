import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/NavBar.css";

const NavBottom = (props) => {
  
  return (
    <nav className="NavBottom">
<NavLink exact to="/created/coming-events" className="link"><i className="fas fa-user-circle" style={{color: props.path === "/created/coming-events" ? '#ffa41b' : '#0c084c'}}></i></NavLink>
<NavLink exact to="/events/create" className="link"><i className="fas fa-plus-circle" style={{color: props.path === "/events/create" ? '#ffa41b' : '#0c084c'}}></i></NavLink>
<NavLink exact to="/events/alert" className="link"><i className="fas fa-bell" style={{color: props.path === "/events/alert"  ? '#ffa41b' : '#0c084c'}}></i></NavLink>
<NavLink exact to="/" className="link"><i className="fas fa-comments" style={{color: props.path === "/" ? '#ffa41b' : '#0c084c'}}></i></NavLink>
<NavLink exact to="/more" className="link"><i className="fas fa-bars" style={{color: props.path === "/more" ? '#ffa41b' : '#0c084c'}}></i></NavLink>
    </nav>
  );
};

export default NavBottom;
