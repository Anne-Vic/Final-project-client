import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import NavTop from '../NavTop';
import NavBottom from '../NavBottom';
import Card from "../Card";
import UserContext from "../Auth/UserContext";
import dayjs from "dayjs";
const today = dayjs()

export default class Events extends Component {

    static contextType = UserContext;

    state = {
        allEvents : []
    }

    // handleClick = (event) => {
    //   console.log(event)
    //     const value = event.target.value;
    //     const key = event.target.name;
    //     this.setState({ [key]: !value });
    //     console.log(this.state)
    //   };

    // handleClick = (event) => {
    //   console.log(event)
    //     this.setState({ isComplete: !event });
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


    // componentDidMount() {
    //     apiHandler.getMyEvents().then((data) => {
    //       this.setState({ allEvents: data });
    //     });
    //   }

      componentDidMount() {
        apiHandler.getMyEvents().then((data) => {
            data = data.map(event=>{
                const date1 = dayjs(event.date, "YYYY-MM-DD")
  if(date1.isValid()) event.delay = date1.diff(today, "d")
            return event})
          this.setState({ allEvents: data });
        });
      }

    render() {
        
        return (
            <div>
                <NavTop/>
                <div>
                  <button>Coming</button>
                  <button>Past</button>
                </div>
                {this.state.allEvents.filter(event => event.delay >=0).sort((a,b) => a.delay - b.delay).map(event => {
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
                            <p>{event.date} @ {event.time} D-{event.delay}</p>
                            <p>Level: {event.level}</p>
                            <br/>
                            <p>{event.description}</p>
                            <br/>
                            {/* </Link> */}
                            <div>
                            <NavLink exact to={`/update/${event._id}`} className="link"><i className="fas fa-edit"></i></NavLink>   
                            <i className="fas fa-trash" onClick={() => this.handleDelete(event._id)}></i>
                            {event.isComplete && <i className="fas fa-toggle-on" name="isComplete" value={event.isComplete} ></i>}
                            {!event.isComplete && <i className="fas fa-toggle-off"></i>}
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