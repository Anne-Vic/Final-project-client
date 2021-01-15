import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div  key={props.event._id}>
    <Link className="cardEvent" to={`/events/${props.event._id}` }>
    <div className="eventImg">
        <img src={props.event.eventImg} alt={props.event.sport}/>
    </div>
    <div className="eventText">
        <h1>{props.event.sport} - {props.event.city} </h1>
        <br/>
        <p>{props.event.date} - {props.event.time}</p>
        <p>Level: {props.event.level}</p>
        <br/>
        <p>{props.event.description}</p>
        <br/>
        {props.event.owner && <p>Created by {props.event.owner.username} <img id="profileImg" src={props.event.owner.profileImg} alt={props.event.owner.username}/> </p>}
        <p>{props.history}</p>
    </div>
    </Link>
</div>
  );
};

export default Card;