import React from "react";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";


class MovieDay extends React.Component {
  render() {
    return (
      <ListGroup.Item>
        <Card border style={{ width: '30%' }}>
          <Card.Title>{this.props.movie.title} </Card.Title>
          <Card.Img
            src={`https://image.tmdb.org/t/p/w500${this.props.movie.image_url}`}
            alt={this.props.movie.title}>
          </Card.Img>
          <Card.Text>{this.props.movie.overview}</Card.Text>
        </Card>
      </ListGroup.Item>
    )
  }
}

export default MovieDay;
