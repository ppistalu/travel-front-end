import { Component } from 'react';
import {connect} from 'react-redux';
import {userCurrentPosition} from '../../Store/actions.js';

class Directions extends Component {

  constructor(props) {
    super(props);
    this.state = {
        origin: '',
        waypoint: [],
        destination: '',
        currentPosition: {
          lat: "",
          lng: "",
        }
      }
  }

success = (pos) => {
  //console.log(pos)
  this.setState({currentPosition:{
    lat:pos.coords.latitude,
    lng:pos.coords.longitude,
  }})
  this.props.dispatch(userCurrentPosition(this.state.currentPosition))
}

error = (err) => {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

id = navigator.geolocation.watchPosition(this.success, this.error, this.options);

  directionsService = new this.props.google.maps.DirectionsService();
  directionsDisplay = new this.props.google.maps.DirectionsRenderer();

  convert = (route) => ({
    lat: route.latitude,
    lng: route.longitude,
  })

    getOriginAndWaypoints = (values) => {

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition( (position) => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.setState({currentPosition:pos,
                          origin:pos, 
                          destination: this.convert(values[values.length-1]),
                          waypoints: values.slice(0, -1).map(e =>({
                                    location: {lat : e.latitude, lng : e.longitude},
                                    stopover: true }))
                        });
          }, () => {
            alert("Hey, can't get your location. Origin will not be set to your current location.");
            this.setState({origin: this.convert(values[0]), 
                          destination: this.convert(values[values.length-1]),
                          waypoints: values.slice(1,(values.length-1)).map(e => ({
                            location: {lat : e.latitude, lng : e.longitude},
                            stopover: true})) 
                        });
          });
        } else {
          // Browser doesn't support Geolocation
          this.setState({origin: this.convert(values[0]), 
                        destination: this.convert(values[values.length-1]),
                        waypoints: values.slice(1,(values.length-1)).map(e => ({
                          location: {lat : e.latitude, lng : e.longitude},
                          stopover: true })) 
                        })
        }
        
    }



  componentDidUpdate = () => {
    const {route} = this.props;
    const values = Object.values(route);
    if(this.state.origin===''){
      this.getOriginAndWaypoints(values)
      return null;
    }
    var p1 = new this.props.google.maps.LatLng(this.state.currentPosition.lat, this.state.currentPosition.lng);
    var p2 = new this.props.google.maps.LatLng(this.state.destination.lat, this.state.destination.lng);
    // const p1 = this.state.currentPosition;
    // const p2 = this.state.destination;
    //console.log(this.state.currentPosition)
    const calcDistance = (p1, p2) => {
      return values.map(e => (this.props.google.maps.geometry.spherical.computeDistanceBetween(p1, 
        new this.props.google.maps.LatLng(e.latitude,e.longitude)

        ) / 1000).toFixed(2));
    }

    //console.log(values)

    //console.log(calcDistance(p1,p2))

    //const result = this.getOriginAndWaypoints(values);
    //console.log("origin",result);
    this.directionsDisplay.setMap(this.props.map);
    this.directionsService.route({
          origin: this.state.origin,
          destination: this.state.destination,
          travelMode: 'WALKING',
          waypoints: this.state.waypoints,
        },(response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  }


	render() { 
		return null;
	}

}

export default connect()(Directions);