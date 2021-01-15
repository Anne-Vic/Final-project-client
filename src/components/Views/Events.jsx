import React, { Component } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import NavTop from '../NavTop';
import NavBottom from '../NavBottom';
import Card from "../Card";
import dayjs from "dayjs";
import SelectLevel from "../SelectLevel";
import SelectSport from "../SelectSport";
import SelectCity from "../SelectCity";
const today = dayjs();

export default class Events extends Component {
    state = {
        allEvents : [],
        filteredEvents: [],
        level : "",
        sport: "", 
        city: ""
    }

    componentDidMount() {
        apiHandler.getEvents().then((data) => {
            data = data.map(event=>{
                const date1 = dayjs(event.date, "YYYY-MM-DD")
  if(date1.isValid()) event.delay = date1.diff(today, "d")
            return event})
          this.setState({ allEvents: data, filteredEvents: data,  });
        });
      };

      filterAll() {
        let filterLvl=this.state.allEvents.filter(event => this.state.level === "" ? true : this.state.level === event.level )
        console.log("LEVEL", filterLvl)
        console.log(this.state.filLevel)
        let filterLvlSpt=filterLvl.filter(event => this.state.sport === "" ? true : this.state.sport === event.sport )
        console.log("LEVELSPORT",filterLvlSpt)
        let filterLvlSptCity=filterLvlSpt.filter(event => this.state.city === "" ? true : this.state.city === event.city )
        console.log("ALL",filterLvlSptCity)
        return filterLvlSptCity
        // this.setState({filteredEvents : filterLvlSptCity})
    }

    //   handleLevel = (ev) => {
    //     this.setState({
    //       filteredLevel: this.state.allEvents.filter((event) =>
    //         event.level.includes(ev.target.value)
    //       ),
    //     });
    //   };

    //   handleLevel = (ev) => {
    //     this.setState({
    //       filLevel: ev.target.value
    //     });
    //   };

    //   handleSport = (ev) => {
    //     this.setState({
    //       filteredSport: this.state.allEvents.filter((event) =>
    //         event.sport.includes(ev.target.value)
    //       ),
    //     });
    //   };

    handleChange = (ev) => {
        this.setState({
         [ev.target.name] : ev.target.value
        });
        this.filterAll()
      };

    
    // handleCity = (ev) => {
    //     this.setState({
    //       filCity: ev.target.value
    //     });
    //  };



    render() {
    //     if (this.state.allEvents.length >0)
    //     {const date1 = dayjs(this.state.allEvents[3].date, "YYYY-MM-DD")
    // const today = dayjs()
    // const diff = today.diff(date1, "d")
    // console.log(this.state.allEvents[3])
    //     console.log(diff)}
    console.log(this.state)
   
        return (
            <div>
                <SelectCity  filter="City" handleFilterCity={this.handleChange}/>
                <SelectSport filter="Sport" handleFilterSport={this.handleChange}/>
                <SelectLevel filter="Level" handleFilterLevel={this.handleChange}/>
                {this.filterAll().filter(event => event.delay >=0 && !event.isComplete )/*.filter(event => event.sport === this.state.filSport).filter(event => event.level === this.state.filLevel)*/.sort((a,b) => a.delay - b.delay).map(event => {
                    return (
                        <Card event={event}/>
                        // <div  key={event._id}>
                        //     <Link className="cardEvent" to={`/events/${event._id}` }>
                        //     <div className="eventImg">
                        //         <img src={event.eventImg} alt={event.sport}/>
                        //     </div>
                        //     <div className="eventText">
                        //         <h1>{event.sport} - {event.city} </h1>
                        //         <br/>
                        //         <p>{event.date} - {event.time}</p>
                        //         <p>Level: {event.level}</p>
                        //         <br/>
                        //         <p>{event.description}</p>
                        //         <br/>
                        //         {event.owner && <p>Created by {event.owner.username} <img id="profileImg" src={event.owner.profileImg} alt={event.owner.username}/> </p>}
                        //     </div>
                        //     </Link>
                        // </div>
                    )
                })}
                <NavBottom/>
            </div>
        )
    }
}
