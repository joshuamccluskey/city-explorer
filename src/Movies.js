import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';


class Movies extends React.Component {
  render() {
    console.log(this.props.moviesData);
    let moviesRender = this.props.moviesData.map((movie, idx) => (
      <ListGroup.Item key={idx}>
        <Card border style={{ width: '30%' }}>
          <Card.Title>{movie.title} </Card.Title>
          <Card.Img
            src={`https://image.tmdb.org/t/p/w500${movie.image_url}`}
            alt={movie.title}>
          </Card.Img>
          <Card.Text>{movie.overview}</Card.Text>
        </Card>
      </ListGroup.Item>
    ));
    return (
      <>
        {
          this.props.showMovies &&
          <ListGroup>
            {moviesRender}
          </ListGroup>
        }

      </>
    )

  }
}



export default Movies;
