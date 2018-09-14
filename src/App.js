import React, { Component } from 'react';
import cloudyImage from './img/cloudy.png';
import rainyImage from './img/rainy.png';
import snowyImage from './img/snowy.png';
import sunnyImage from './img/sunny.png';
import './css/App.css';

class Day extends Component {
  render() {
    let weatherImage = 'asdf';
    let asdf = this.props.description;
    if(asdf){
      if(asdf.includes('rain')){
        weatherImage = rainyImage;
      } else if(asdf.includes('cloud' || 'fog')){
        weatherImage = cloudyImage;
      } else if(asdf.includes('snow')){
        weatherImage = snowyImage;
      } else if(asdf.includes('clear' || 'sun')){
        weatherImage = sunnyImage;
      }
    }

    return (
      <div>
        <p>{this.props.currentDayOfWeek}</p>
        <p>{this.props.currentDate}</p>        
        <img src={weatherImage} className="App-img" alt="weather" />
        <p id='description'>{this.props.description}</p>
        <p id='temp'>{this.props.temp}</p>
        <p id='humidity'>{this.props.humidity}</p>
        <p id='wind'>{this.props.wind}</p>
      </div>
    );
  }
}

export { 
  Day
}
