import React, { Component } from 'react';
import cloudyImage from './img/cloudy.png';
import rainyImage from './img/rainy.png';
import snowyImage from './img/snowy.png';
import sunnyImage from './img/sunny.png';

class Day extends Component {
  render() {
    let weatherImage;
    let description = this.props.description;
    if(description){
      if(description.includes('rain')){
        weatherImage = rainyImage;
      } else if(description.includes('cloud' || 'fog')){
        weatherImage = cloudyImage;
      } else if(description.includes('snow')){
        weatherImage = snowyImage;
      } else if(description.includes('clear' || 'sun')){
        weatherImage = sunnyImage;
      }
    }

    return (
      <div className="weather-info">
        <p>{this.props.currentDayOfWeek}</p>
        <p>{this.props.currentDate}</p>
        <img src={weatherImage} className="forecast-img" />
        <p id='temp' className="weather__key"><span className="weather__value"> {this.props.temp}</span></p>
        <section style={{display: this.props.getDetails ? "block" : "none"}}>
          <p id='description' className="weather__key"><span className="weather__value"> {this.props.description}</span></p>
          
          <p id='humidity' className="weather__key"><span className="weather__value">{this.props.humidity}</span></p>
          <p id='wind' className="weather__key"><span className="weather__value">{this.props.wind}</span></p>
        </section>

      </div>

    );
  }
}

export {
  Day
}
