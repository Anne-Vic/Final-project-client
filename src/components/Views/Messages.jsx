import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import NavTop from "../NavTop";
import NavBottom from "../NavBottom";

import "../../styles/Conversation.css";

export default class Messages extends Component {
  state = {
    messages: null,
    message: "",
    event: null,
  };

  formRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
    console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const eventId = this.props.match.params.id;
    console.log("Add message Id", eventId);

    apiHandler
      .addMessage(eventId, { message: this.state.message })
      .then((data) => {
        this.formRef.current.reset();
        this.getMessages();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    apiHandler.getOneEvent(this.props.match.params.id).then((data) => {
      this.setState({ event: data });
    });
    this.getMessages();
  }

  getMessages() {
    const eventId = this.props.match.params.id;
    apiHandler.getMessages(eventId).then((data) => {
      this.setState({ messages: data });
    });
  }

  render() {
    if (!this.state.event) return <div>Loading...</div>;

    return (
      <div>
        <NavBottom />
        <div className="body">
          <div className="chat">
            <strong>
              {this.state.event.sport} - {this.state.event.city} -
              {this.state.event.date}
            </strong>
            {this.state.messages && this.state.messages.length === 0 && (
              <div>Start the conversation</div>
            )}
            {this.state.messages && this.state.messages.length > 0 && (
              <div style={{ overflow: "scroll", height: "60vh" }}>
                {this.state.messages.map((message) => {
                  return (
                    <div key={message._id}>
                      <div className="message">
                        <br />
                        <div className="author message">
                          <img
                            id="profileImg"
                            src={message.author.profileImg}
                            alt={message.author.username}
                          />
                          <strong>{message.author.username}</strong>, on{" "}
                          {String(message.createdAt).slice(0, 10)} :
                        </div>
                        <div>{message.message}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="messages">
            <form
              ref={this.formRef}
              id="form-message"
              onSubmit={this.handleSubmit}
            >
              <input
                maxLength="100"
                value={this.state.message}
                onChange={this.handleChange}
                name="message"
                placeholder="Your message..."
              />
              <button>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        <NavTop />
      </div>
    );
  }
}
