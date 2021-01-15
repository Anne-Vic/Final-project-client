import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";

const NavTop = (props) => {
  const { context } = props;

  return (
    <nav className="NavTop">
        {context.isLoggedIn && (
         <NavLink exact to="/events" className="link"><i className="fas fa-home"></i></NavLink>
        )}
        {!context.isLoggedIn && (<h1>Catch me if you train</h1>)}
    
    </nav>
  );
};

export default withUser(NavTop);
