import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import { NavLink } from "react-router-dom";
import apiHandler from "../../api/apiHandler";

import { Link, Redirect } from "react-router-dom";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    username: "",
    email: "",
    password: "",
    profileImg : "/Profil.PNG"
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/events" />;
    }

    return (
      <section>
      <NavLink exact to="/" className="link"><i className="fas fa-home"></i></NavLink>
      <form style={{display:"flex", flexDirection: "column"}} onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          onChange={this.handleChange}
          value={this.state.username}
          type="text"
          id="username"
          name="username"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={this.handleChange}
          value={this.state.email}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />

        <label className="label" htmlFor="profileImg">
        Upload a profile picture
        <i className="icon fas fa-cloud-upload-alt fa-2x"></i>
        </label>
        <input type="file" id="profileImg" name="profileImg"></input>
        <button>Submit</button>
      </form>
      <div >
      <p>Already have an account? </p>
      <Link to="/signin">Sign in</Link>
    </div>
      </section>
    );
  }
}

export default withRouter(FormSignup);
