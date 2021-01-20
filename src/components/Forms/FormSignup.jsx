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
    profileImg: "/Profil.PNG",
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
        <NavLink exact to="/" className="NavTop">
          <i className="fas fa-home"></i>
        </NavLink>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              onChange={this.handleChange}
              value={this.state.username}
              type="text"
              id="username"
              name="username"
              autoFocus={true}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              onChange={this.handleChange}
              value={this.state.email}
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              id="password"
              name="password"
            />
          </div>

          <div className="field upload">
            <label className="label" htmlFor="profileImg">
              Upload a profile picture <span>-------</span>
              <i className="icon fas fa-cloud-upload-alt"></i>
            </label>
            <input
              className="hidden"
              type="file"
              id="profileImg"
              name="profileImg"
            ></input>
          </div>

          <button>Submit</button>
          <br />
          <p>
            Already have an account ?
            <Link className="signin" to="/signin">
              {" "}
              Sign in
            </Link>
          </p>
        </form>
      </section>
    );
  }
}

export default withRouter(FormSignup);
