import React, { Component } from "react";
import moment from "moment";
import "moment-timezone";
//import tz from "zipcode-to-timezone";
import "./App.css";

class App extends Component {
  state = {};
  getTime = () => {
    let time = moment()
              .utcOffset(this.state.timezone / 60)
              .format("llll");
    this.setState({
      time: time,
    });
  };
  getWeather = () => {
    let zipInput = document.getElementById("zipcode").value;
    console.log(zipInput);
    
    
    // let tempval=parseInt( ((this.state.temperature-273.15)*1.8)+32)+'&#8457' ;
    // console.log(tempval);
    fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zipInput+'&units=imperial&appid=93366594e122065ac46ecc951c9a81df')
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        response.json().then((data) => {
          console.log(data);
          this.setState({
            zip: data.zipInput,
            city: data.name,
            country:data.sys.country,
            temperature: Math.round(data.main.temp)+"°F",
            
            description: data.weather[0].description,
            timezone: data.timezone,
            icon: data.weather[0].icon,
          });
          this.getTime();
        });
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
      });
  };
  render() {
    return (
      <>
      
        <div className="container">
          <h2>WEATHER APP</h2>
          </div>
          <div id="header">
            <input type="text" placeholder="Enter ZipCode" id="zipcode"></input>
            <button id="btn" onClick={this.getWeather}>SEARCH</button>
          </div>
          <div id="main">
            
            <div>
                  <p>CITY :<span>{this.state.city}{this.state.country}</span></p>
                  
                  <p id="temp">TEMPERATURE:{this.state.temperature}</p>
                  
                  <p id="desc">DESCRIPTION:{this.state.description}</p>
                  
                  <p class="time">TIME:{this.state.time}</p>
                  <img src={`https://openweathermap.org/img/wn/${this.state.icon}.png`} alt=""/>
            </div>
          </div>
        
      </>
      
    );
  }
}
export default App;