import React from 'react';
import MovieDay from './MovieDay';
import ListGroup from 'react-bootstrap/ListGroup';



class Movies extends React.Component {
  render() {
    console.log(this.props.moviesData);
    let moviesRender = this.props.moviesData.map((movie, idx) => (
      <MovieDay key={idx} movie={movie}/>
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
