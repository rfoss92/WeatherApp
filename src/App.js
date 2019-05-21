import React, { Component } from 'react';
import './css/index.css';
import {Day} from './Day';
import {Form} from './Form';

class App extends Component {
	 constructor(props) {
    super(props);
    this.state = {
      error: null,
			currentDayOfWeek: [],
			currentDate: [],
      description: [],
      temp: [],
      humidity: [],
      wind: [],
      backgroundImage: '',
      coordinates: '',
      forecastedDays: 1,
      getDetails: false
    };
    this.setForecastedDays = this.setForecastedDays.bind(this);
    this.getDetails = this.getDetails.bind(this); 
  }


	getWeather = async (e) =>  {
    e.preventDefault();
    const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;

		fetch(`http://api.openweathermap.org/data/2.5/forecast
			?q=${city}
			,${country}
			&appid=1815c1cb674522f41e5935a2267ee5b6`)
    .then(res => res.json())
    .then(
      (result) => {
      	this.setWeatherState(result);
      	this.setTimeState();
        this.setState({});
      },
      (error) => {
        this.setState({
          error
        });
      }
    ).then(
    	// this.setBackground()
    )

	}

	setWeatherState(response) {
  	for(let i = 0; i<7; i++){
  		let temp = response.list[i].main.temp;
  		temp = Math.round(((temp-273.15)*1.8)+32) + '°F';
  		
  		this.state.description.push(response.list[i].weather[0].description);
  		this.state.temp.push(temp);
  		this.state.humidity.push(' Humidity: ' + response.list[i].main.humidity + '%');
  		this.state.wind.push('Wind: ' + response.list[i].wind.speed + ' mph');
		}
	}

	setTimeState() {
		for(let i = 0; i<7; i++){
			let date = new Date();  
			let month = date.getMonth() + 1;
			month = (month < 10 ? "0" : "") + month;
			let day  = date.getDate() + i;
			day = (day < 10 ? "0" : "") + day;
			this.state.currentDate.push(month + "/" + day);

			date.setDate(date.getDate()+i)
			let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			let dayName = days[date.getDay()];
			this.state.currentDayOfWeek.push(dayName);
		} 
	}

	// setBackground() {
	//   let date = new Date();
	//   let hour = date.getHours();

	// 	document.body.style.backgroundImage = 'url(' + require(`./img/${this.greeting}.jpg`) + ')'; 
	// }	

  getDayComponents() {
  	let dayComponents = []
		for(let i = 0; i<this.state.forecastedDays; i++){
    	dayComponents.push(this.createDayComponent(i));
    }
    return dayComponents;
  }

  createDayComponent(i) {
    return <Day 
	  	currentDayOfWeek={this.state.currentDayOfWeek[i]}
	  	currentDate={this.state.currentDate[i]}
	  	description={this.state.description[i]}
	  	temp={this.state.temp[i]}
	  	humidity={this.state.humidity[i]}
	  	wind={this.state.wind[i]}
	  	getDetails={this.state.getDetails}
  	/>;
  }

  getDetails() {
  	this.setState({
			getDetails: !(this.state.getDetails)
		});
  }

  setForecastedDays(days) {
  	this.setState({
			forecastedDays: days
		});
  }

  render() {
		if (this.state.description){
	    return (
	    	<div>
		      <div className="wrapper">
					  <div className="main">
					    <div className="container">
					    	<div className="row">
								
									<div className="col-md-12 form-container">
						    		<Form getWeather={this.getWeather}/>									

						    		<section className="menu">
							    		<button onClick={() => this.setForecastedDays(1)}>One Day</button>
							    		<button onClick={() => this.setForecastedDays(3)}>Three Day</button>
							    		<button onClick={() => this.setForecastedDays(7)}>Seven Day</button>
						    		</section>
							      <section className="menu">
							    		<button onClick={this.getDetails}>Details</button>
						    		</section>
							      <div className="forecast container">
							        <div className="row">
						      	  	{this.getDayComponents()}
						      	  </div>
							      </div>

						      </div>

					   	  </div>
					  	</div>
						</div>
					</div>

	    	
	    	</div>
	    );
	  } else {
	  	return (
	      <div className="loading">
		  		<span>Loading...</span>
		  	</div>
	  	);
	  }
	}
}

export {
  App
}
