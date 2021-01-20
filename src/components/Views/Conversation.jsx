import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import NavTop from "../NavTop";
import NavBottom from "../NavBottom";
import dayjs from "dayjs";
import "../../styles/Conversation.css";
const today = dayjs().format("YYYY-MM-DD");

// import "../../styles/Card.css";

export default class Conversation extends Component {
  state = {
    myMessages: [],
  };

  componentDidMount() {
    apiHandler.getMyMessages().then((data) => {
      this.setState({ myMessages: data });
    });
  }

  render() {
    if (!this.state.myMessages) return <div>Loading...</div>;
    console.log("my messages", this.state.myMessages);
    const myEvents = [
      ...new Set(this.state.myMessages.map((message) => message.event._id)),
    ];
    const events = myEvents.map((event) => {
      const messages = this.state.myMessages.filter(
        (message) => message.event._id === event
      );
      const currentEvent = messages[0].event;
      return { event: currentEvent, messages };
    });

    console.log("EVENTS FORMATED", events);

    const eventToDisplay = [
      { event: {}, messages: [{}] },
      { event: {}, messages: [{}] },
      { event: {}, messages: [{}] },
    ];

    console.log(myEvents);
    console.log(today);
    return (
      <div>
        <NavTop />
        <div className="body">
          {/* {events.map((event) => (
            <div key={event.event._id}>
              <h1>{event.event.sport}</h1>
              <ul>
                {event.messages.map((message) => (
                  <li key={message._id}>{message.message}</li>
                ))}
              </ul>
            </div>
          ))} */}
          {events.map((event) => (
            <div className="all conv" key={event.event._id}>
              {event.messages.map((message) => (
                <NavLink
                  exact
                  to={`/messages/by-event/${message.event._id}`}
                  className="event conv"
                  key={message._id}
                >
                  <img
                    id="profileImg"
                    src={message.author.profileImg}
                    alt={message.author.username}
                  />
                  <div className="conv message">
                    <strong>{message.author.username}</strong>
                    <p>{message.message}</p>
                    <p>
                      {message.event.sport} - {message.event.date.slice(2)}
                    </p>
                  </div>
                  <div className="conv date">
                    <p>{message.createdAt.slice(2, 10)}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
        <NavBottom path={this.props.history.location.pathname} />
      </div>
    );
  }
}
