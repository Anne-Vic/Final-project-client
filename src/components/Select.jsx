import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { Capitalize } from "../utils.js";

export default class SelectCity extends Component {
  state = {
    allEvents: [],
  };

  componentDidMount() {
    apiHandler.getEvents().then((data) => {
      this.setState({ allEvents: data });
    });
  }

  render() {
    const filter = this.props.filter;

    return (
      <div>
        <select name={filter} onChange={this.props.handleFilter}>
          <option value="">{Capitalize(filter)}</option>
          {[...new Set(this.state.allEvents.map((event) => event[filter]))]
            .sort((a, b) => a.localeCompare(b))
            .map((el) => {
              return <option value={el}>{el}</option>;
            })}
        </select>
      </div>
    );
  }
}
