import React, { Component } from "react";
import NavTop from "../NavTop";
import NavBottom from "../NavBottom";
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
        const event = apiResponse;
        this.setState({
          sport: event.sport,
          date: event.date,
          city: event.city,
          country: event.country,
          meetingPoint: event.meetingPoint,
          time: event.time,
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

    if (this.imageRef.current.files[0]) {
      fd.append("eventImg", this.imageRef.current.files[0]);
    }

    const eventId = this.props.match.params.id;

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
        <div className="body">
          <form
            className="formcreate"
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
          >
            <h3>Update your event</h3>
            <div className="field">
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
                autoFocus={true}
              />
            </div>

            <div className="field">
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
                placeholder="When ?"
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
              <label className="label" htmlFor="level">
                Choose your level:
                <select
                  value={this.state.value}
                  onChange={this.handleChange}
                  name="level"
                  id="level"
                  // defaultValue={this.state.value}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
            </div>

            <div className="field">
              <label className="label" htmlFor="description">
                Describe your event:
                <textarea
                  maxLength="100"
                  rows="3"
                  value={this.state.description}
                  onChange={this.handleChange}
                  name="description"
                  id="description"
                />
              </label>
            </div>

            <div className="field upload">
              <label className="label" htmlFor="eventImg">
                Add an image for your event <span>----</span>
                <i className="icon fas fa-cloud-upload-alt"></i>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="eventImg"
                name="eventImg"
                ref={this.imageRef}
              ></input>
            </div>

            <div className="field full">
              <label className="label full">
                Event full ?
                <input
                  className="input full"
                  name="isComplete"
                  type="checkbox"
                  checked={this.state.isComplete}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <button>Update</button>
          </form>
        </div>
        <NavBottom path={this.props.history.location.pathname} />
      </div>
    );
  }
}
