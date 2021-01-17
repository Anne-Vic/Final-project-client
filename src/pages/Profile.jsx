import React from "react";
import NavTop from '../components/NavTop';
import NavBottom from '../components/NavBottom';
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import "../styles/Card.css"

const Profile = (props) => {
  const { context } = props;
  return (
    <div>
      <NavTop/>
      <div className="middle">
      <div className="btn profile">
      <NavLink exact to="/myprofile/created-events" > <button className="link profile">Created events</button> </NavLink>
      <NavLink exact to="/myprofile/joined-events" > <button className="link profile">Joined events</button> </NavLink>
      </div>
      {/* {context.user && <p>Hey {context.user.username} ! </p>} */}
      </div>
      <NavBottom path={this.props.history.location.pathname}/>
    </div>
  );
};

export default withUser(Profile);
