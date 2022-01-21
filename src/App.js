import React from 'react';
import axios from 'axios';
import Weather from './Weather.js';

import '../src/App.css'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderError: false,
      errorMessage: '',
      searchCity: '',
      cityData: {},
      showMap: false,
      weatherData: [],
      showWeather: false,
      imgUrl: '',
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    let city = e.target.city.value;

    this.setState({
      searchCity: e.target.city.value,
    });
    this.getCity(city);
  }



  getCity = async (city) => {
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${city}&format=json`

      console.log(url);
      let citySearch = await axios.get(url);

      console.log(citySearch.data[0]);
      this.setState({
        cityData: citySearch.data[0],
        showMap: true,
        imgUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`,
        errorMessage: ''

      })
    } catch (error) {
      let url = `http://localhost:3002/throw-an-error`
      let errorMessage = await axios.get(url);
      console.log(errorMessage);

      this.setState({
        renderError: true,
        errorMessage: `Uh Oh Error: ${error.response.status}, ${error.response.data.error};}`
      })
    }
    this.getWeather();
  }
  getWeather = async () => {

    try {
      let url = `http://localhost:3002/weather?city_name=${this.state.searchCity}`
      let cityResults = await axios.get(url)
      console.log(cityResults.data);

      this.setState({
        weatherData: cityResults.data,
        showWeather: true,
        errorMessage: ''
      })
    } catch (error) {
      let url = `http://localhost:3002/throw-an-error`
      let errorMessage = await axios.get(url);
      console.log(errorMessage);

      this.setState({
        renderError: true,
        errorMessage: `Uh Oh Error: ${error.response.status}, ${error.response.data.error};}`
      })
    }

  }
  render() {
    console.log(this.state.weatherData);

    return (
      <>

        <h1>City Explorer</h1>

        <main>
          <form onSubmit={this.handleSubmit}>
            <label>Explore a City!
              <input name="city" type="text" placeholder='🔎 Ex. Seattle' />
            </label>
            <button type="submit">Explore!</button>
          </form>
          <h2>{this.state.errorMessage}</h2>
        <Weather
        cityData={this.state.cityData}
        showMap={this.state.showMap}
        showWeather={this.state.showWeather}
        weatherData={this.state.weatherData}
        imgUrl={this.state.imgUrl}
        />

   
        </main>

        <h3>&copy; 2022 Joshua McCluskey</h3>


      </>
    )
  }
}

export default App;
