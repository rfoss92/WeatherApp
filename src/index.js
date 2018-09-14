import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {Day} from './App';

let quotesArray = [{
      	  Quote: 'Imagination is more important than knowledge',
      		Author: 'Albert Einstein'
      },{
      	  Quote: 'If music be the food of love, play on',
      		Author: 'Shakespeare '
      },{
      	  Quote: 'The way to get started is to quit talking and begin doing',
      		Author: 'Walt Disney'
      },{
      	  Quote: 'Obstacles are those frightful things you see when you take your eyes off the goal',
      		Author: 'Henry Ford'
      },{
      	  Quote: 'I skate where the puck is going to be, not where it has been',
      		Author: 'Wayne Gretzky'
      },{
      	  Quote: 'When you come to a fork in the road, take it',
      		Author: 'Yogi Berra'
      },{
      	  Quote: 'The life which is unexamined is not worth living',
      		Author: 'Socrates'
      }]

class Weather extends Component {
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
      greeting: '',
      time: '',
      backgroundImage: '',
      quotes: [],
      crd: ''
    };
    this.getCords = this.getCords.bind(this);
    this.success = this.success.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount() {
		this.getCords();
  } 

	getCords(){
		navigator.geolocation.getCurrentPosition(this.success)
	}
	success(pos) {
  	this.setState({
  		crd: pos.coords	
  	});
  	this.getWeather()
  }
	getWeather(){
		fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.crd.latitude}&lon=${this.state.crd.longitude}&appid=1815c1cb674522f41e5935a2267ee5b6`)
	    .then(res => res.json())
	    .then(
	      (result) => {
	      	for(let i = 0; i<7; i++){      		      		
	      		this.state.description.push(result.list[i].weather[0].description);
	      		this.state.temp.push(result.list[i].main.temp);
	      		this.state.humidity.push(result.list[i].main.humidity);
	      		this.state.wind.push(result.list[i].wind.speed);
					}
					for(let i = 0; i<7; i++){
						let date = new Date();  

						let month = date.getMonth() + 1;
						month = (month < 10 ? "0" : "") + month;
						let day  = date.getDate() + i;
						day = (day < 10 ? "0" : "") + day;
						this.state.currentDate.push(month + "/" + day);

						this.setState({
							quotes: quotesArray[date.getDay()]
						});

						date.setDate(date.getDate()+i)
						let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
						let dayName = days[date.getDay()];
						this.state.currentDayOfWeek.push(dayName);
					} 

	        this.setState({});
	      },
	      (error) => {
	        this.setState({
	          error
	        });
	      }
	    ).then(
	    	this.setTime()
	    )
	}
	setTime() {
	  let date = new Date();
	  let hour = date.getHours();
	  hour = (hour < 10 ? "0" : "") + hour;
	  let min  = date.getMinutes();
	  min = (min < 10 ? "0" : "") + min;
	  let time = hour + ":" + min;
	  this.time = time;  
	  this.setGreeting(hour);  
	}
	setGreeting(hour){
	  (5 < hour && hour <= 12) ? (this.greeting = 'Morning') 
	    : (12 < hour && hour <= 18) ? (this.greeting = 'Afternoon')
	    : (18 < hour && hour <= 21) ? (this.greeting = 'Evening')
	    : (this.greeting = 'Night');
		document.body.style.backgroundImage = 'url(' + require(`./img/${this.greeting}.jpg`) + ')'; 
	}	

  getDays() {
  	let array = []
		for(let i = 0; i<7; i++){
    	array.push(this.day(i));
    }
    return array;
  }
  day(i) {
    return <Day 
	  	currentDayOfWeek={this.state.currentDayOfWeek[i]}
	  	currentDate={this.state.currentDate[i]}
	  	description={this.state.description[i]}
	  	temp={this.state.temp[i]}
	  	humidity={this.state.humidity[i]}
	  	wind={this.state.wind[i]}
  	/>;
  }
  
  render() {
		if (this.state.description){
	    return (
	    	<div>
	    		<h1>Good {this.greeting}!</h1>
	    		<h2>{this.time}</h2>
	    		<h2>Your 7 Day Forecast</h2>
		      <div className="App">
	      	  {this.getDays()}
		      </div>
		      <div className="Quote">
	      	   "{this.state.quotes.Quote}"
	      	   <br/>- {this.state.quotes.Author}
		      </div>
	    	</div>
	    );
	  } else {
	  	return (
	      <div className="App">
		  		<span>Loading...</span>
		  	</div>
	  	);
	  }
	}
}

ReactDOM.render(<Weather />, document.getElementById('root'));
