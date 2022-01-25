import React from 'react';
import WeatherDay from './WeatherDay';
import ListGroup from 'react-bootstrap/ListGroup';



class Weather extends React.Component {
  render() {
    console.log(this.props.weatherData);
    let weatherRender = this.props.weatherData.map((day, idx) => (
   <WeatherDay key={idx} day={day}/>
    ));
    return (
      <>
        {
          this.props.showWeather &&
          <ListGroup>
            {weatherRender}
          </ListGroup>
        }

      </>
    )

  }
}



export default Weather;
