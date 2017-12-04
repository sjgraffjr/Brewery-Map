import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header/header.js';
import Footer from './Footer/Footer.js';
import Map from './Map/Map.js'

class App extends Component {
  
  //getting info from backend
  

  render() {
    return (
      <div className="App">
      <Header>Brewery Map</Header>
      <Map/>
      <Footer>
        <div>Made by <b>GRAFF</b>icDesign</div> 


      </Footer>
      
      </div>
    );
  }
}

export default App;
