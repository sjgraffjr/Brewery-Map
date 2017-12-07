import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header/header.js';
import Footer from './Footer/Footer.js';
import Map from './Map/Map.js'
const BACKEND_URL = 'http://localhost:5000'

class App extends Component {
  
  //getting info from backend
  render() {
    return (
      <div className="App">
      <Header>Brewery Map</Header>
      <Map/>
      <Footer>
        <div>Made by <b>GRAFF</b>icDesign</div> 
        <a className="backend" href={`${BACKEND_URL}/brewers`}>Manage Brewers</a> | 
        <a className="backend" href={`${BACKEND_URL}/locations`}>Manage Locations</a>
      </Footer>
      
      </div>
    );
  }
}

export default App;
