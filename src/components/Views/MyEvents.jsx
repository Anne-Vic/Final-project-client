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
import "../../styles/Card.css"
const today = dayjs()

export default class Events extends Component {

    static contextType = UserContext;

    state = {
        allEvents : []
    }

    // handleToggle = (value) => {
    //     this.setState({ isComplete: !value });
    //     console.log("key and value", value)
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
        apiHandler.getMyEvents().then((data) => {
            data = data.map(event=>{
            const date1 = dayjs(event.date, "YYYY-MM-DD")
            if(date1.isValid()) event.delay = date1.diff(today, "d")
            return event})
            this.setState({ allEvents: data });
        });
      }

    render() {
    console.log("history", this.props.history.location.pathname)  
    console.log("check histo", this.props.history.location.pathname === "/created/coming-events")
        return (
            <div>
                <NavTop/>
                <div className="invisibleBig" >
                    <div className="btn profile">
                <NavLink exact to="/created/coming-events" > <button className="link profile">Coming events</button> </NavLink>
                <NavLink exact to="/created/past-events" > <button className="link profile">Past events</button> </NavLink>
                    </div>
                </div>
                
                <div className="middle">
                
                {this.props.history.location.pathname === "/created/coming-events" && this.state.allEvents.filter(event => event.delay >=0).sort((a,b) => a.delay - b.delay).map(event => {
                    return (
                        
                        <div  className="card multiple create" key={event._id} >
                        <div className="cardEvent create">
                        <Link  to={`/events/${event._id}` }>
                        <div className="eventTop">
                        <div className="eventImg create">
                            <img className="event image" src={event.eventImg} alt={event.sport}/>
                        </div>
                        <div className="eventInfo create">
                            <p><strong>{event.sport} - {event.city} </strong></p>
                            <br/>
                            <p>{event.date} @ {event.time} D-{event.delay}</p>
                            <p>Level: {event.level}</p>
                        </div>
                        </div>
                        </Link>
                        <p>{event.description}</p>
                        <div className="eventManage">
                            <div className="manage event">
                            <NavLink exact to={`/update/${event._id}`} className="link"><i className="fas fa-edit"></i></NavLink> 
                            {/* <i className="fas fa-edit"><NavLink exact to={`/update/${event._id}`} className="link"/></i>   */}
                            <i className="fas fa-trash" onClick={() => this.handleDelete(event._id)}></i>
                            {/* {event.isComplete && <i className="fas fa-toggle-on" name="isComplete" value={event.isComplete} ></i>}
                            {!event.isComplete && <i className="fas fa-toggle-off"></i>} */}
                            { event.isComplete ? <i className="fas fa-toggle-on" name="isComplete" value={event.isComplete} onClick={() => this.handleToggle()} ></i> :  <i className="fas fa-toggle-off" name="isComplete" value={event.isComplete} onClick={(event) => this.handleToggle(event._id)}></i> }
                            </div>
                            </div>
                        </div>  
                    </div>
                    )
                })}
                {this.props.history.location.pathname === "/created/past-events" && this.state.allEvents.filter(event => event.delay <0).sort((a,b) => a.delay - b.delay).map(event => {
                    return (
                        <div  className="card multiple create" key={event._id} >
                        <div className="cardEvent create">
                        <Link  to={`/events/${event._id}` }>
                        <div className="eventTop">
                        <div className="eventImg create">
                            <img className="event image" src={event.eventImg} alt={event.sport}/>
                        </div>
                        <div className="eventInfo create">
                            <p><strong>{event.sport} - {event.city} </strong></p>
                            <br/>
                            <p>{event.date} @ {event.time} D-{event.delay}</p>
                            <p>Level: {event.level}</p>
                        </div>
                        </div>
                        </Link>
                        <p>{event.description}</p>
                        <div className="eventManage">
                            <div className="manage event">
                            <NavLink exact to={`/update/${event._id}`} className="link"><i className="fas fa-edit"></i></NavLink> 
                            {/* <i className="fas fa-edit"><NavLink exact to={`/update/${event._id}`} className="link"/></i>   */}
                            <i className="fas fa-trash" onClick={() => this.handleDelete(event._id)}></i>
                            {event.isComplete && <i className="fas fa-toggle-on" name="isComplete" value={event.isComplete} onClick={() => this.handleToggle()} ></i>}
                            {!event.isComplete && <i className="fas fa-toggle-off"></i>}
                            </div>
                            </div>
                        </div>  
                    </div>
                    )
                })}
                </div>
                <div className="invisible" >Oups you found me</div>
                <NavBottom path={this.props.history.location.pathname}/>
            </div>
        )
    }
}