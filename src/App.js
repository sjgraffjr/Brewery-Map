import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMapsLoader from 'google-maps' 
import qs from 'qs';
GoogleMapsLoader.KEY = 'AIzaSyB4FZaYri65G07f57JJiIR3XvoEjQseBEQ'

class App extends Component {
  componentDidMount(){
    GoogleMapsLoader.load((google)=> {
      const mapCanvas = this.refs.Map;
      const mapOptions = {
        center: {lat: 41.931929, lng: -87.698327},
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      const map = new google.maps.Map(mapCanvas, mapOptions);
      google.maps.event.addListener(map, 'idle', () => {
        this.fetchLocations(map).then((locations)=>{
          locations.forEach((location)=>{ 
            const marker = new google.maps.Marker({
              position: new google.maps.LatLng(parseFloat(location.latitude),parseFloat(location.longitude)),
              map: map,
            })
            const infoWindow = new google.maps.InfoWindow({
              content: `<h1>${location.brewer.name}</h1>${location.address} ${location.locality} ${location.region} ${location.zipcode}`
            });
            marker.addListener('click',() => {
              infoWindow.open(map, marker)
            })
          })
        })
      })

    });     
  }
  //getting info from backend
  fetchLocations(map){
    const url = `http://localhost:3000/locations.json?${qs.stringify(this.buildQuery(map))}`
    return fetch(url).then((res)=>{
        return res.json().then((locations)=>{
        return locations
      })
    })
  }

  buildQuery(map){
    let bounds = map.getBounds()
    let ne = bounds.getNorthEast()
    let sw = bounds.getSouthWest()

    return {
      top_right: {
        lat: ne.lat(),
        lon: ne.lng()
      },
      bottom_left: {
        lat: sw.lat(),
        lon: sw.lng()
      }
    }
  }

  render() {
    return (
      <div id="map-canvas" ref="Map" className="App">
        
      </div>
    );
  }
}

export default App;
