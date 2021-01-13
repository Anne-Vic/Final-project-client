import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";

export default class OneEvent extends Component {
    state = {
        event = null,
    }

    // componentDidMount() {
    //     apiHandler.getEvents().then((data) => {
    //       this.setState({ items: data });
    //     });
    //   }


    render() {
        if (!this.state.event) {
            return <div>Event is loading...</div>;
          }
        return (
            <div className="cardOneEvent">
                <h1>Created by {this.state.event.owner.username}</h1>
                

                
            </div>
        )
    }
}