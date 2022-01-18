import React from 'react';
import axios from 'axios';
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
    }
  }

  handleSubmit = e => {
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
        cityData: citySearch.data[0]
      })
    } catch (error) {
      this.setState({
        renderError: true,
        errorMessage: `Uh Oh Error: ${error.response.status}, ${error.response.data.error};}`
      })
    }
  }


  render() {
    return (
      <>

      <h1>City Explorer</h1>

        <main>
          <form onSubmit={this.handleSubmit}>
            <label>Explore a City!
              <input name="city" type="text" placeholder='🔎 Ex. Seattle'/>
            </label>
            <button type="submit">Explore!</button>
          </form>
          <h2>{this.state.errorMessage}</h2>
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
        </main>

        <h3>&copy; 2022 Joshua McCluskey</h3>


      </>
    )
  }
}

export default App;





