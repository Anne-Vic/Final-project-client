import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import NavTop from '../NavTop';
import NavBottom from '../NavBottom';
import Card from "../Card";

export default class Events extends Component {
    state = {
        allEvents : []
    }

    componentDidMount() {
        apiHandler.getEvents().then((data) => {
          this.setState({ allEvents: data });
        });
      }

    render() {
        return (
            <div>
                <div><input type="text"/></div>
                {this.state.allEvents.map(event => {
                    return (
                        <Card event={event}/>
                        // <div  key={event._id}>
                        //     <Link className="cardEvent" to={`/events/${event._id}` }>
                        //     <div className="eventImg">
                        //         <img src={event.eventImg} alt={event.sport}/>
                        //     </div>
                        //     <div className="eventText">
                        //         <h1>{event.sport} - {event.city} </h1>
                        //         <br/>
                        //         <p>{event.date} - {event.time}</p>
                        //         <p>Level: {event.level}</p>
                        //         <br/>
                        //         <p>{event.description}</p>
                        //         <br/>
                        //         {event.owner && <p>Created by {event.owner.username} <img id="profileImg" src={event.owner.profileImg} alt={event.owner.username}/> </p>}
                        //     </div>
                        //     </Link>
                        // </div>
                    )
                })}
                <NavBottom/>
            </div>
        )
    }
}
