import React, { Component } from 'react';
import NavTop from '../NavTop';
import NavBottom from '../NavBottom';
import apiHandler from "../../api/apiHandler";

export default class FormCreateEvent extends Component {
    state = {
        date: "",
        sport: "",
        city: "",
        country: "",
        meetingPoint: "",
        time: "",
        eventImg: "/Duo.jpg",
        description: "",
        status: "false",
        level: ""
    };
    

    handleChange = (event) => {
      const value = event.target.value;
      const key = event.target.name;
      this.setState({ [key]: value });
      console.log(this.state)
    };

    handleSubmit = (event) => {
      event.preventDefault();
  
      apiHandler
        .addEvent( {
          date: this.state.date,
          sport: this.state.sport,
          city: this.state.city,
          country: this.state.country,
          meetingPoint: this.state.meetingPoint,
          time: this.state.time,
          eventImg: this.state.eventImg,
          description: this.state.description,
          status: this.state.status,
          level: this.state.level,
        })
  
        .then((apiResponse) => {
          console.log(apiResponse);
          this.props.history.push("/events");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    render() {
        return (
            <div >
              <NavTop/>
              <h1>Create your event</h1>
                <form style={{display:"flex", flexDirection: "column"}} onSubmit={this.handleSubmit} enctype="multipart/form-data">
                <label className="label" htmlFor="sport">
              Sport
            </label>
            <input
              className="input"
              type="text"
              onChange={this.handleChange}
              value={this.state.sport}
              placeholder="Which sport do you want to practise ?"
              name="sport"
              id="sport"
            />
            <label className="label" htmlFor="Country">
              Country
            </label>
            <input
              className="input"
              type="text"
              onChange={this.handleChange}
              value={this.state.country}
              placeholder="In which country ?"
              name="country"
              id="country"
            />
            <label className="label" htmlFor="city">
              City
            </label>
            <input
              className="input"
              type="text"
              onChange={this.handleChange}
              value={this.state.city}
              placeholder="In which city ?"
              name="city"
              id="city"
            />
            <label className="label" htmlFor="meetingPoint">
              Meeting Point
            </label>
            <input
              className="input"
              type="text"
              onChange={this.handleChange}
              value={this.state.meetingPoint}
              placeholder="Choose a meeting point"
              name="meetingPoint"
              id="meetingPoint"
            />
            <label className="label" htmlFor="date">
              When
            </label>
            <input
              className="input"
              type="date"
              onChange={this.handleChange}
              value={this.state.date}
              placeholder="When ?"
              name="date"
              id="date"
            />
            <label className="label" htmlFor="time">
              Time
            </label>
            <input
              className="input"
              type="time"
              step="1800"
              onChange={this.handleChange}
              value={this.state.time}
              placeholder="At what time ?"
              name="time"
              id="time"
            />
           <label className="label" htmlFor="level">
          Choose your level:
          <select value={this.state.value} onChange={this.handleChange} name="level" id="level">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>

        <label className="label" htmlFor="description">
          Describe your event:
          <textarea value={this.state.value} onChange={this.handleChange} name="description" id="description"/>
        </label>

        <label className="label" htmlFor="eventImg">
        Upload an image for your event
        <i className="icon fas fa-cloud-upload-alt"></i>
    </label>
    <input style ={{visibility:"hidden"}} type="file" id="eventImg" name="eventImg" ref={this.state.eventImg}></input>

    <button>Create</button>


                </form>
                <NavBottom/>    
            </div>
        );
    }
}
