import React from 'react';
import axios from 'axios';
import Weather from './Weather.js';
import Movies from './Movies.js';
import Card from 'react-bootstrap/Card';
import '../src/App.css'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderError: false,
      errorMessage: '',
      searchCity: '',
      cityData: {},
      lat: '',
      lon: '',
      showMap: false,
      weatherData: [],
      moviesData: [],
      showWeather: false,
      showMovies: false
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let city = e.target.city.value;

    this.setState({
      searchCity: e.target.city.value,
    });
    this.getCity(city);
  }

  handleInput = (e) => {
    e.preventDefault();

    this.setState({
      searchCity: e.target.value
    })
    console.log(this.state.searchCity);
  }



  getCity = async () => {
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchCity}&format=json`;

      let citySearch = await axios.get(url);

      this.setState({
        cityData: citySearch.data[0],
        lat: citySearch.data[0].lat,
        lon: citySearch.data[0].lon,
        showMap: true,
        errorMessage: ''

      })
    } catch (error) {
      this.setState({
        renderError: true,
        errorMessage: `Uh Oh Error: ${error.response.status}, ${error.response.data.error}`
      })
    }
    this.getWeather();
  }
  getWeather = async () => {

    try {
      let url = `http://localhost:3002/weather?lat=${this.state.lat}&lon=${this.state.lon}`
      let weatherResults = await axios.get(url);
      console.log(weatherResults.data);

      this.setState({
        weatherData: weatherResults.data,
        showWeather: true,
        errorMessage: ''
      })
    } catch (error) {
      this.setState({
        renderError: true,
        errorMessage: `Uh Oh Error: ${error.response.status}, ${error.response.data.error}`
      })
    }

  }
  getMovies = async () => {
    // try {
      let url = `http://localhost:3002/movies?cityQuery=${this.state.searchCity}`;
      console.log(url);
      let movieResults = await axios.get(url);
      console.log(movieResults.data);

      this.setState({
        moviesData: movieResults.data,
        showMovies: true,
        errorMessage: ''
      })


    // } catch {
    //   this.setState({
    //     renderError: true,
    //     errorMessage: `Uh Oh Error: ${error.response.status}, ${error.response.data.error}`
    //   }
    // }
  }  
    render() {
      console.log(this.state.weatherData);

      return (
        <>

          <h1>City Explorer</h1>

          <main>
            <form onSubmit={this.handleSubmit}>
              <label>Explore a City!
                <input
                  name="city"
                  type="text"
                  placeholder='🔎 Ex. Seattle'
                  onInput={this.handleInput} />
              </label>
              <button type="submit">Explore!</button>
            </form>


            <h2>{this.state.errorMessage}</h2>
            {
              this.state.showMap &&
              <Card>
                <Card.Body>
                  <Card.Title>City: {this.state.cityData.display_name}</Card.Title>
                  <Card.Text>Latitude : {this.state.cityData.lat}</Card.Text>
                  <Card.Text>Longitude : {this.state.cityData.lon}</Card.Text>
                  <Card.Img
                    src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`}
                    alt={this.state.cityData.display_name}
                    title={this.state.cityData.display_name} />
                </Card.Body>

              </Card>
            }


            <Weather
              cityData={this.state.cityData}
              showMap={this.state.showMap}
              getWeather={this.getWeather}
              showWeather={this.state.showWeather}
              weatherData={this.state.weatherData}

            />

            <Movies />
          </main>

          <h3>&copy; 2022 Joshua McCluskey</h3>


        </>
      )
    }
  }

export default App;
