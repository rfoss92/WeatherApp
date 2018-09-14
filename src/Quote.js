import React, { Component } from 'react';
import './css/App.css';

// (quote => {
//   $("#quoteButton").click(() => {
//     let url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
//     $.getJSON(url, (data) => {
//       $("#quote-content").html('" ' + data.quoteText + ' "');
//       $("#quote-author").html(" - " + data.quoteAuthor);
//       randomQuote = $("#quote-content").text();
//       randomAuthor = $("#quote-author").text();
//     });
//   });
//   $("#tweetLink").click(() => open("https://twitter.com/intent/tweet?text=" + randomQuote + randomAuthor));
// })();

class Quote extends Component {
  render() {
    return (
      <div>
      	<div>
		      <div className="quote">
		        <button id='quoteButton'>Get Quote!</button>
		        <button id="tweetLink" aria-label="Tweet this">
		          <img src="https://www.nopcommerce.com/images/thumbs/0001175_400.png" alt="twitter"/>
		        </button>       
		      </div>
		      {this.props.randomQuote}
		      {this.props.randomAuthor}       
		    </div>
      </div>
    );
  }
}

export { 
  Quote
}