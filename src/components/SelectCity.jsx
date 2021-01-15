import React, { Component } from 'react';
import apiHandler from "../api/apiHandler";

export default class SelectCity extends Component {

    state = {
        allEvents : [],
    }

    componentDidMount() {
        apiHandler.getEvents().then((data) => {
          this.setState({ allEvents: data });
        });
      }

    render() {
        return (
            <div>
                <select name="city" onChange={this.props.handleFilterCity}>
                    <option value="">City ? </option>
                    {[...new Set(this.state.allEvents.map(event => event.city))].sort((a,b) => a.localeCompare(b)).map(city => {
                    return (
                        <option value={city}>{city}</option>
                    )
                })}
                </select>
            </div>
        )
    }
}