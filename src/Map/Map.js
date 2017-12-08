import React, { Component } from 'react';
import './Map.css';
import GoogleMapsLoader from 'google-maps' 
import qs from 'qs';
GoogleMapsLoader.KEY = 'AIzaSyB4FZaYri65G07f57JJiIR3XvoEjQseBEQ';
GoogleMapsLoader.LIBRARIES = ['places'];
const BACKEND_URL = 'https://brewery-map-backend.herokuapp.com';      

class Map extends Component{
	constructor(props){
		super(props)
		console.log(props,'props')
	}
	componentDidMount(){
		GoogleMapsLoader.load((google)=> {
			const mapCanvas = this.refs.Map;
			const mapOptions = {
				center: {lat: 41.931929, lng: -87.698327},
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			const map = new google.maps.Map(mapCanvas, mapOptions);
			// Create the search box 
			const input = document.getElementById('pac-input');
			const searchBox = new google.maps.places.SearchBox(input);
			map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	        // Bias the SearchBox results towards current map's viewport.
	        map.addListener('bounds_changed', function() {
	        	searchBox.setBounds(map.getBounds());
	        });
	        google.maps.event.addListener(map, 'idle', () => {
	        	this.fetchLocations(map).then((locations)=>{
	        		locations.forEach((location)=>{ 
	        			const marker = new google.maps.Marker({
	        				position: new google.maps.LatLng(parseFloat(location.latitude),parseFloat(location.longitude)),
	        				map: map,
	        			})
	        			const infoWindow = new google.maps.InfoWindow({
	        				content: `
	        				<h1>${location.brewer.name}</h1>
	        				<img src="${location.brewer.img_url}"/>
	        				<h4>
	        				<a href="${location.brewer.website}">
	        				${location.brewer.website}
	        				</a></br>
	        				<img src="http://maps.gstatic.com/tactile/omnibox/directions-1x-20150909.png"></br>
	        				<a target="_blank" href="https://www.google.com/maps?saddr=My+Location&daddr=${location.address}+${location.locality}+${location.region}+${location.zipcode}&t=h">Directions</a>

	        				</h4>${location.address} ${location.locality} ${location.region} ${location.zipcode}</br>
	        				${location.phone}`
	        			});
	        			marker.addListener('click',() => {
	        				infoWindow.open(map, marker)
	        			})
	        		})
	        	})
	        })
	        searchBox.addListener('places_changed', function() {
	        	const places = searchBox.getPlaces();

	        	if (places.length == 0) {
	        		return;
	        	}
	        	const bounds = new google.maps.LatLngBounds();
	        	places.forEach(function(place) {
	        		if (!place.geometry) {
	        			console.log("Returned place contains no geometry");
	        			return;
	        		}

	        		if (place.geometry.viewport) {
		              // Only geocodes have viewport.
		              bounds.union(place.geometry.viewport);
		          	} else {
		          		bounds.extend(place.geometry.location);
		          	}
			    });
	        	map.fitBounds(bounds);
	        });

	    });     
	}

	fetchLocations(map){
		const url = `${BACKEND_URL}/locations.json?${qs.stringify(this.buildQuery(map))}`
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
	render(){
		return (
			<div>
			<div id="map-canvas" ref="Map"></div>
			<input id="pac-input" className="controls" type="text" placeholder="Search Box"/>

			</div>

			)
	}

}


export default Map;