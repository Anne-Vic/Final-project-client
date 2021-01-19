import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import "../styles/Card.css";

const Card = (props) => {
  return (
    <div  className="card multiple" key={props.event._id}>
    <Link className="cardEvent" to={`/events/${props.event._id}` }>
      <div className="eventTop">
    <div className="eventImg">
        <img className="event image" src={props.event.eventImg} alt={props.event.sport}/>
    </div>
    <div className="eventInfo">
        <strong>{props.event.sport} - {props.event.city} </strong>
        <br/>
        <br/>
        <p>{props.event.date} @ {props.event.time}</p>
        {props.event.delay <8 && <p>In only {props.event.delay} days !</p>}
        {/* {props.event.delay >7 && <p>In more than a week </p>} */}
        <p>Level: {props.event.level}</p>
    </div>
    </div>
    <div>
    <p>{props.event.description}</p>
    {/* <br/> */}
    </div>
    <div className="eventAbout">
        
        {props.event.owner && <p className="owner">Created by {props.event.owner.username} <span >-----</span><img id="profileImg" src={props.event.owner.profileImg} alt={props.event.owner.username}/> </p>}
        {/* <p>{props.history}</p> */}
    </div>
    </Link>
</div>
  );
};

export default Card;