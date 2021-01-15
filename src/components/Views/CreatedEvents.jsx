import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import NavTop from '../NavTop';
import NavBottom from '../NavBottom';
import Card from "../Card";
import UserContext from "../Auth/UserContext";

export default class Events extends Component {

    static contextType = UserContext;

    state = {
        allEvents : []
    }

    // handleClick = (event) => {
    //     const value = event.target.value;
    //     const key = event.target.name;
    //     this.setState({ [key]: !value });
    //     console.log(this.state)
    //   };

    handleDelete = (eventId) => {
        apiHandler
          .deleteEvent(eventId)
          .then((apiResponse) => {
            this.setState({
              allEvents: this.state.allEvents.filter((event) => event._id !== eventId),
            });
          })
          .catch((error) => {
            console.log(error);
          });
      };


    componentDidMount() {
        apiHandler.getEvents().then((data) => {
          this.setState({ allEvents: data });
        });
      }

    render() {
        
        return (
            <div>
                <NavTop/>
                {this.state.allEvents.map(event => {
                    return (
                        <div  key={event._id} style ={{display:"flex"}}>
                        <Link className="cardEvent" to={`/events/${event._id}` }>
                        <div className="eventImg">
                            <img src={event.eventImg} alt={event.sport}/>
                        </div>
                        </Link>
                        <div className="eventText" style ={{display:"flex", flexDirection:"column"}}>
                        {/* <Link className="cardEvent" to={`/events/${event._id}` }> */}
                            <h1>{event.sport} - {event.city} </h1>
                            <br/>
                            <p>{event.date} - {event.time}</p>
                            <p>Level: {event.level}</p>
                            <br/>
                            <p>{event.description}</p>
                            <br/>
                            {/* </Link> */}
                            <div>
                            <NavLink exact to="/update" className="link"><i className="fas fa-edit"></i></NavLink>   
                            <i className="fas fa-trash" onClick={() => this.handleDelete(event._id)}></i>
                            {event.status && <i className="fas fa-toggle-on" name="isComplete" value={event.isComplete} onClick={this.handleDelete(event._id)}></i>}
                            {!event.status && <i className="fas fa-toggle-off"></i>}
                            </div>
                        </div>
                        
                    </div>
                    )
                })}
                <NavBottom/>
            </div>
        )
    }
}