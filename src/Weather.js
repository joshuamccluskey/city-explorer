import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


class Weather extends React.Component {
  render() {
    console.log(this.props.weatherData);
    let weatherRender = this.props.weatherData.map((day, idx) => (
      <ListGroup.Item key={idx}>Date: {day.datetime}, {day.description}</ListGroup.Item>
    ));
    return (
      <>
        {
          this.props.showMap &&
          <Card>
            <Card.Body>
              <Card.Title>City: {this.props.cityData.display_name}</Card.Title>
              <Card.Text>Latitude : {this.props.cityData.lat}</Card.Text>
              <Card.Text>Longitude : {this.props.cityData.lon}</Card.Text>
              <Card.Img
                src={this.props.imgUrl}
                alt={this.props.cityData.display_name}
                title={this.props.cityData.display_name} />
            </Card.Body>

          </Card>
        }
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
