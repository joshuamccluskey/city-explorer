import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


class Weather extends React.Component {
  render() {
    console.log(this.props.weatherData);
    let weatherRender = this.props.weatherData.map((day, idx) => (
      <ListGroup.Item key={idx}>
      Date: {day.datetime}, 
      Condtions: {day.description}, 
      Low: {day.low_temp},
      High: {day.max_temp},
      Current: {day.temp}
      </ListGroup.Item>
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
