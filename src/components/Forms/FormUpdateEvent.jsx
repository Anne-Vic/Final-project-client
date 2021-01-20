import React, { Component } from "react";
import NavTop from "../NavTop";
import apiHandler from "../../api/apiHandler";
import dayjs from "dayjs";
const today = dayjs();

export default class FormUpdateEvent extends Component {
  state = {
    date: "",
    sport: "",
    city: "",
    country: "",
    meetingPoint: "",
    time: "",
    // eventImg: "",
    description: "",
    isComplete: "false",
    level: "",
  };

  imageRef = React.createRef();

  componentDidMount() {
    const eventId = this.props.match.params.id;

    apiHandler
      .getOneEvent(eventId)
      .then((apiResponse) => {
        // console.log(apiResponse);
        const event = apiResponse;
        this.setState({
          sport: event.sport,
          date: event.date,
          city: event.city,
          country: event.country,
          meetingPoint: event.meetingPoint,
          time: event.time,
          eventImg: event.eventImg,
          description: event.description,
          isComplete: event.isComplete,
          level: event.level,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();

    for (let key in this.state) {
      fd.append(key, this.state[key]);
    }

    fd.append("eventImg", this.imageRef.current.files[0]);

    // fd.append("isComplete",  this.state.isComplete)

    const eventId = this.props.match.params.id;
    console.log("fd", fd);
    console.log(this.imageRef);

    apiHandler
      .updateEvent(eventId, fd)

      .then((apiResponse) => {
        console.log(apiResponse);
        this.props.history.push("/created/coming-events");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <NavTop />
        <h1>Update your event</h1>
        <form
          className="form"
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >
          <label className="label" htmlFor="sport">
            Sport
          </label>
          <input
            className="input"
            type="text"
            onChange={this.handleChange}
            value={this.state.sport}
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
            min={today}
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
            name="time"
            id="time"
          />
          <label className="label" htmlFor="level">
            Choose your level:
            <select
              value={this.state.value}
              onChange={this.handleChange}
              name="level"
              id="level"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>

          <label className="label" htmlFor="description">
            Describe your event:
            <textarea
              value={this.state.description}
              onChange={this.handleChange}
              name="description"
              id="description"
            />
          </label>

          <label className="label" htmlFor="eventImg">
            Upload an image for your event
            <i className="icon fas fa-cloud-upload-alt"></i>
          </label>
          <input
            style={{ visibility: "hidden" }}
            type="file"
            id="eventImg"
            name="eventImg"
            ref={this.imageRef}
          ></input>

          <label>
            Event full ?
            <input
              name="isComplete"
              type="checkbox"
              checked={this.state.isComplete}
              onChange={this.handleChange}
            />
          </label>

          <button>Update</button>
        </form>
        {/* <NavBottom path={this.props.history.location.pathname}/>    */}
      </div>
    );
  }
}
