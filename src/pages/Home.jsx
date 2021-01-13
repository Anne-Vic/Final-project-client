import React from "react";
import NavTop from "../components/NavTop";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page ∆</h1>
        <NavTop/>
        <button><NavLink to="/signup">Sign up</NavLink></button>
        <button><NavLink to="/signin">Sign in</NavLink></button>
      </div>
    );
  }
}

export default Home;
