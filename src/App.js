import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header/header.js'
import Map from './Map/Map.js'

class App extends Component {
  
  //getting info from backend
  

  render() {
    return (
      <div className="App">
      <Header>Brewery Roadtrip</Header>
      <Map/>
      
      </div>
    );
  }
}

export default App;
