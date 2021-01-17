import React from "react";
import NavTop from "../components/NavTop";
import { NavLink } from "react-router-dom";

import "../styles/global.css"

class Home extends React.Component {
  render() {
    return (
      <div>
        <NavTop/>
        <div className="auth">
        <button><NavLink to="/signup">Sign up</NavLink></button>
        <button><NavLink to="/signin">Sign in</NavLink></button>
        </div>
      </div>
    );
  }
}

export default Home;
