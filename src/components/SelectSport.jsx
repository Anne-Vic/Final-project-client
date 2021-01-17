import React, { Component } from 'react';
import apiHandler from "../api/apiHandler";

export default class SelectSport extends Component {

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
                <select name="sport" onChange={this.props.handleFilterSport}>
                    <option value="">Sport</option>
                    {this.state.allEvents.sort((a,b)=> a.sport.localeCompare(b.sport)).map(event => {
                    return (
                        <option value={event.sport}>{event.sport}</option>
                    )
                })}
                </select>
            </div>
        )
    }
}
