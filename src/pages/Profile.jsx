import React from "react";
import NavTop from '../components/NavTop';
import NavBottom from '../components/NavBottom';
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";

const Profile = (props) => {
  const { context } = props;
  return (
    <div>
      <NavTop/>
      {context.user && <p>Hey {context.user.username} ! </p>}
      <NavLink exact to="/myprofile/created-events" className="link"> <button>Created events</button> </NavLink>
      <NavLink exact to="/myprofile/joined-events" className="link"> <button>Joined events</button> </NavLink>
      <NavBottom/>
    </div>
  );
};

export default withUser(Profile);
