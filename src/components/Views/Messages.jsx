import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import NavTop from '../NavTop';
import NavBottom from '../NavBottom';

import "../../styles/Card.css";

export default class Messages extends Component {
    state = {
        messages : null,
        message : "",
    }

    formRef = React.createRef();

    handleChange = (event) => {
      const value = event.target.value;
      const key = event.target.name;
      this.setState({ [key]: value });
      console.log(this.state)
     
    };

    handleSubmit = (event) => {
      event.preventDefault();

      const eventId = this.props.match.params.id;
      console.log("Add message Id", eventId)

      apiHandler
        .addMessage(eventId, {message : this.state.message})
        .then((data) => {
          // this.context.setUser(data);
          this.componentDidMount();
          this.formRef.current.reset()
        })
        .catch((error) => {
          console.log(error);
        });
    };


    componentDidMount() {
      const eventId = this.props.match.params.id;
      console.log(eventId);
        apiHandler.getMessages(eventId).then((data) => {
          this.setState({ messages: data });
        });
      }


    render() {
        if (!this.state.messages) {
            return <div><NavTop/>Message is loading...</div>;
          }
          console.log( this.state.messages.length)
          console.log(typeof this.state.messages)
        return (
            <div>
                <NavTop/>
                <div className="invisible" >Oups you found me</div>
                <div className="middle card one">
                <strong className="center"></strong>
                {this.state.messages.length === 0 && <div>Start the conversation</div>}
                {this.state.messages.length > 0 && <strong>{this.state.messages[0].event.sport} - {this.state.messages[0].event.city} - {this.state.messages[0].event.date}</strong>}
                {this.state.messages.length > 0 &&
                <div style={{overflow:"scroll", height:"60vh"}}>
                  {this.state.messages.map(message => {
                    return (
                        <div>
                          <div className="message">
                            <br/>
                            <div>{message.author.username} sent on {String(message.createdAt).slice(0,10)} :</div>
                            <div>{message.message}</div>
                            
                          </div>
                        </div>
                    )
                })}
                </div>}
                <form onSubmit={this.handleSubmit} ref={this.formRef} >
                <div className="field">
                <label className="label" htmlFor="description">New message:</label>
                <textarea maxLength="100" rows="3" value={this.state.value} onChange={this.handleChange} name="message" id="message" placeholder="Write on the event conversation"/>
                </div>
                <button>Post</button>
                </form>
                </div>
                <NavBottom/>  
            </div>
     
        )
        
    }
}
