import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavTop from "../NavTop";
import apiHandler from "../../api/apiHandler";
import NavBottom from "../NavBottom";
import dayjs from "dayjs";
import { buildFormData } from "../../utils.js";
import "../../styles/NavBar.css";
const today = dayjs().format("YYYY-MM-DD");

class FormCreateEvent extends Component {
  state = {
    date: today,
    sport: "",
    city: "",
    country: "",
    meetingPoint: "",
    time: "09:00",
    // eventImg: "",
    description: "",
    isComplete: "false",
    level: "",
  };

  imageRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();

    for (let key in this.state) {
      fd.append(key, this.state[key]);
    }

    if (this.imageRef.current.files[0]) {
      fd.append("eventImg", this.imageRef.current.files[0]);
    }

    apiHandler
      .addEvent(fd)
      .then((data) => {
        // clear form
        // this.imageRef.current.reset();
        // this.props.addEvent(data);
        this.props.history.push("/events");
        this.setState({
          date: today,
          sport: "",
          city: "",
          country: "",
          meetingPoint: "",
          time: "09:00",

          description: "",
          isComplete: "false",
          level: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div /*className="main"*/>
        <NavTop />
        <div className="body">
          <form
            ref={this.formRef}
            className="formcreate"
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
          >
            <h3>Create your event</h3>
            <div className="field">
              <label className="label" htmlFor="sport">
                {" "}
                Sport
              </label>
              <input
                className="input"
                type="text"
                onChange={this.handleChange}
                value={this.state.sport}
                placeholder="Tennis, Running, Boxing..."
                name="sport"
                id="sport"
                autoFocus={true}
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="Country">
                {" "}
                Country
              </label>
              <input
                className="input"
                type="text"
                onChange={this.handleChange}
                value={this.state.country}
                name="country"
                id="country"
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="city">
                City
              </label>
              <input
                className="input"
                type="text"
                onChange={this.handleChange}
                value={this.state.city}
                name="city"
                id="city"
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="meetingPoint">
                Meeting Point
              </label>
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
              <label className="label" htmlFor="date">
                When
              </label>
              <input
                className="input"
                type="date"
                onChange={this.handleChange}
                value={this.state.date}
                name="date"
                id="date"
                min={today}
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="time">
                Time
              </label>
              <input
                className="input"
                type="time"
                step="1800"
                onChange={this.handleChange}
                value={this.state.time}
                name="time"
                id="time"
              />
            </div>

            <div className="field">
              <label
                className="label"
                htmlFor="level"
                style={{ marginBottom: "0" }}
              >
                <select
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="level"
                  id="level"
                >
                  <option value="">Select a level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
            </div>

            <div className="field">
              <label className="label" htmlFor="description">
                Describe your event:
              </label>
              <textarea
                maxLength="100"
                rows="3"
                value={this.state.value}
                onChange={this.handleChange}
                name="description"
                id="description"
                placeholder="Few words about this event...(100 characters max)"
              />
            </div>

            <div className="field upload">
              <label className="label" htmlFor="eventImg">
                Add an image for your event <span>----</span>
                <i className="icon fas fa-cloud-upload-alt"></i>
              </label>
              <input
                style={{ visibility: "hidden" }}
                type="file"
                id="eventImg"
                name="eventImg"
                ref={this.imageRef}
              ></input>
            </div>

            <button>Create</button>
          </form>
        </div>
        <NavBottom path={this.props.history.location.pathname} />
      </div>
    );
  }
}

export default withRouter(FormCreateEvent);
