import React, { Component } from "react";
import { UserContext } from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import apiHandler from "../../api/apiHandler";

import { Redirect } from "react-router-dom";

import "../../styles/Form.css";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/events");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
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
        <form
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" autoFocus={true} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button>Submit</button>
        </form>
      </section>
    );
  }
}

export default withRouter(FormSignin);
