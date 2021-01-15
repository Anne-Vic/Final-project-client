import React, { Component } from "react";
import { UserContext } from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import apiHandler from "../../api/apiHandler";

import { Link, Redirect } from "react-router-dom";

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
        <NavLink exact to="/" className="link"><i className="fas fa-home"></i></NavLink>
        <form style={{display:"flex", flexDirection: "column"}} onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button>Submit</button>
      </form>
      </section>
      
    );
  }
}

export default withRouter(FormSignin);
