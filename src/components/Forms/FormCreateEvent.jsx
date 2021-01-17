import React, { Component } from 'react';
import NavTop from '../NavTop';
import NavBottom from '../NavBottom';
import apiHandler from "../../api/apiHandler";
import dayjs from "dayjs";
import "../../styles/NavBar.css"
const today = dayjs().format("YYYY-MM-DD");




export default class FormCreateEvent extends Component {
    state = {
        date: today,
        sport: "",
        city: "",
        country: "",
        meetingPoint: "",
        time: "09:00",
        eventImg: "https://res.cloudinary.com/djfnm2nsv/image/upload/v1610900465/Catch/high_five_cryocell_bkavwx.webp",
        description: "",
        isComplete: "false",
        level: "",
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
      console.log("today SRING", String(today))
        return (
            <div className="main" >
              <NavTop/>
              <div >
                {/* <div className="fixNav"></div> */}
                
                <form className="form create"  onSubmit={this.handleSubmit} encType="multipart/form-data">
                <h3>Create your event</h3>
                <div className="field">
                <label className="label" htmlFor="sport"> Sport</label>
                <input
                  className="input"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.sport}
                  placeholder="Tennis, Running, Boxing..."
                  name="sport"
                  id="sport"
                />
                </div>

                <div className="field">
                <label className="label" htmlFor="Country"> Country</label>
                <input
                  className="input"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.country}
                  // placeholder="In which country ?"
                  name="country"
                  id="country"
                />
                </div>
            
                <div className="field">
                <label className="label" htmlFor="city">City</label>
                <input
                  className="input"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.city}
                  // placeholder="In which city ?"
                  name="city"
                  id="city"
                />
                </div>
            
                <div className="field">
                <label className="label" htmlFor="meetingPoint">Meeting Point</label>
                <input
                  className="input"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.meetingPoint}
                  placeholder="Metro station, park..."
                  name="meetingPoint"
                  id="meetingPoint"
                />
                </div>
            
                <div className="field">
                <label className="label" htmlFor="date">When</label>
                <input
                  className="input"
                  type="date"
                  onChange={this.handleChange}
                  value={this.state.date}
                  // placeholder="When ?"
                  name="date"
                  id="date"
                  min={today}
                />
                </div>
            
                <div className="field">
                <label className="label" htmlFor="time">Time</label>
                <input
                  className="input"
                  type="time"
                  step="1800"
                  onChange={this.handleChange}
                  value={this.state.time}
                  // placeholder="At what time ?"
                  name="time"
                  id="time"
                />
                </div>

                <div className="field">
                <label className="label" htmlFor="level" style={{marginBottom:"0"}}>
                {/* Choose your level: */}
                <select value={this.state.value} onChange={this.handleChange} name="level" id="level" >
                <option value="" >Select a level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                </label>
                </div>

                <div className="field">
                <label className="label" htmlFor="description">Describe your event:</label>
                <textarea maxLength="100" rows="3" value={this.state.value} onChange={this.handleChange} name="description" id="description" placeholder="Few words about this event...(100 characters max)"/>
                </div>

        
                <div className="field upload">
                <label className="label" htmlFor="eventImg">Upload an image for your event <span>----</span>
                <i className="icon fas fa-cloud-upload-alt"></i>
                </label>
                <input style ={{visibility:"hidden"}} type="file" id="eventImg" name="eventImg" ref={this.state.eventImg}></input>
                </div>
        
                <button>Create</button>
              
                {/* <div className="fixBot"></div> */}
                </form>
                </div>
                <NavBottom path={this.props.history.location.pathname}/>   
            </div>
        );
    }
}
