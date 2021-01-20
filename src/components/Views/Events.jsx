import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import NavBottom from "../NavBottom";
import Card from "../Card";
import dayjs from "dayjs";
import SelectLevel from "../SelectLevel";
import Select from "../Select";
import "../../styles/Card.css";
import { NumberEvents } from "../../utils.js";
const today = dayjs();

export default class Events extends Component {
  state = {
    allEvents: [],
    filteredEvents: [],
    level: "",
    sport: "",
    city: "",
  };

  componentDidMount() {
    apiHandler.getEvents().then((data) => {
      data = data.map((event) => {
        const date1 = dayjs(event.date, "YYYY-MM-DD");
        if (date1.isValid()) event.delay = date1.diff(today, "d");
        return event;
      });
      this.setState({ allEvents: data, filteredEvents: data });
    });
  }

  filterAll() {
    let filterLvl = this.state.allEvents.filter((event) =>
      this.state.level === "" ? true : this.state.level === event.level
    );
    let filterLvlSpt = filterLvl.filter((event) =>
      this.state.sport === "" ? true : this.state.sport === event.sport
    );
    let filterLvlSptCity = filterLvlSpt.filter((event) =>
      this.state.city === "" ? true : this.state.city === event.city
    );
    return filterLvlSptCity;
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
    this.filterAll();
  };

  render() {
    const lengthEvent = this.filterAll().filter(
      (event) => event.delay >= 0 && !event.isComplete
    ).length;
    return (
      <div>
        <div className="NavSearch">
          <Select
            className="filter"
            filter="city"
            handleFilter={this.handleChange}
          />
          <Select
            className="filter"
            filter="sport"
            handleFilter={this.handleChange}
          />
          <SelectLevel
            className="filter"
            filter="Level"
            handleFilterLevel={this.handleChange}
          />
        </div>
        <div className="invisible">Oups you found me</div>
        <strong className="number events">{NumberEvents(lengthEvent)}</strong>
        {this.filterAll()
          .filter((event) => event.delay >= 0 && !event.isComplete)
          .sort((a, b) => a.delay - b.delay)
          .map((event) => {
            return (
              <>
                <Card event={event} />
              </>
            );
          })}

        <NavBottom path={this.props.history.location.pathname} />
        <div className="invisible">Oups you found me</div>
      </div>
    );
  }
}
