import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import NavTop from '../NavTop';
import NavBottom from '../NavBottom';

import "../../styles/Card.css";

export default class OneEvent extends Component {
    state = {
        event : null,
    }

    componentDidMount() {
      const eventId = this.props.match.params.id;
      console.log(eventId);
        apiHandler.getOneEvent(eventId).then((data) => {
          this.setState({ event: data });
        });
      }


    render() {
        if (!this.state.event) {
            return <div><NavTop/>Event is loading...</div>;
          }
          console.log(this.state.event)
        return (
            <div>
                <NavTop/>
                <div className="invisible" >Oups you found me</div>
                <div className="middle card one">
                <strong className="center">{this.state.event.sport}</strong>
                <hr/>
                <strong className="owner">Created by {this.state.event.owner.username} <span >-----</span><img id="profileImg" src={this.state.event.owner.profileImg} alt={this.state.event.owner.username}/></strong>
                <p><strong>Where: </strong>{this.state.event.city} - {this.state.event.meetingPoint}</p>
                <p><strong>When: </strong>{this.state.event.date} - {this.state.event.time}</p>
                <p><strong>Level: </strong>{this.state.event.level}</p>
                <img className="event image" src={this.state.event.eventImg} alt={this.state.event.sport}/>
                <p>{this.state.event.description}</p>
                <button className="interested"><NavLink to={`/messages/by-event/${this.state.event._id}` }>I'm interested</NavLink></button>
                </div>
                <NavBottom/>  
            </div>
     
        )
        
    }
}