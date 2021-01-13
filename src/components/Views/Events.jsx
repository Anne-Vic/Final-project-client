import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";

export default class Events extends Component {
    state = {
        allEvents = []
    }

    componentDidMount() {
        apiHandler.getEvents().then((data) => {
          this.setState({ items: data });
        });
      }

    //   componentDidMount() {
    //     axios.get("http://localhost:4000/api/events").then((data) => {
    //       this.setState({ allEvents: data,});
    //     });
    //   }

    render() {
        return (
            <div>
                {this.state.allEvents.map(event => {
                    return (
                        <div className="cardEvent" key={event._id}>
                            <Link to={`/events/${event._id}` }>
                            <div className="eventImg">
                                <img src={event.eventImg} alt={event.sport}/>
                            </div>
                            <div className="eventText">
                                <h1>{event.sport} - {event.city} </h1>
                                <br/>
                                <p>{event.date} - {event.time}</p>
                                <p>Level: {event.level}</p>
                                <br/>
                                <p>{event.description}</p>
                                <br/>
                                <p>Created by {event.owner.username}</p>
                            </div>
                            </Link>
                        </div>
                    )
                })}
                
            </div>
        )
    }
}
