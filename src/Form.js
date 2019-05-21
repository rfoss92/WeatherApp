import React from 'react';
const Form = (props) => {
  return (
  		<div className='form-container2'>
	      <form onSubmit={props.getWeather}>
	        <input type="text" name="city" placeholder="City..." required/>
	        <input type="text" name="country" placeholder="Country..." required/>
	        <br /><button>Get Weather</button>
	      </form>
    	</div>
  )
}

export {
  Form
}