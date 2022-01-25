import React from 'react';

import { ListGroup } from 'react-bootstrap';

class WeatherDay extends React.Component {

  render() {
    return (
      <ListGroup.Item>
        Date: {this.props.day.datetime},
        Condtions: {this.props.day.description},
        Low: {this.props.day.low_temp},
        High: {this.props.day.max_temp},
        Current: {this.props.day.temp}
      </ListGroup.Item>
    )
  }

}

export default WeatherDay;
