import React, { Component } from 'react';
import {connect} from 'react-redux';
import {userCurrentPosition} from '../../Store/actions.js';
import Alert from '../../Components/Alert'


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
        },
        distanceFromCurrentPosition: [],
        modalIsOpen: false,
        touristAtt: {}
      }
  }

  success = (pos) => {
    if(pos.coords.latitude===this.state.currentPosition.lat){
      return null;
    }
    this.setState({currentPosition:{
      lat:pos.coords.latitude,
      lng:pos.coords.longitude,
    }})
    this.props.dispatch(userCurrentPosition({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    }))
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

    showDirection = () => {
      this.directionsDisplay.setMap(this.props.map);
      this.directionsService.route({
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: 'WALKING',
      waypoints: this.state.waypoints,
        }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    }

    getOriginAndWaypoints = (route) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition( (position) => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.setState({currentPosition:pos,
                          origin:pos, 
                          destination: this.convert(this.props.route[this.props.route.length-1]),
                          waypoints: this.props.route.slice(0, -1).map(e =>({
                                    location: {lat : e.latitude, lng : e.longitude},
                                    stopover: true }))
                        });
            this.showDirection()
          }, () => {
            alert("Hey, can't get your location. Origin will not be set to your current location.");
            this.setState({origin: this.convert(this.props.route[0]), 
                          destination: this.convert(this.props.route[this.props.route.length-1]),
                          waypoints: this.props.route.slice(1,(this.props.route.length-1)).map(e => ({
                            location: {lat : e.latitude, lng : e.longitude},
                            stopover: true})) 
                        });
          this.showDirection()
          });
        } else {
          // Browser doesn't support Geolocation
          this.setState({origin: this.convert(route[0]), 
                        destination: this.convert(route[route.length-1]),
                        waypoints: route.slice(1,(route.length-1)).map(e => ({
                          location: {lat : e.latitude, lng : e.longitude},
                          stopover: true })) 
                        })
          this.showDirection()
        }
        
    }

  componentDidUpdate = (prevProps, prevState) => {
    const {route} = this.props;
    if(this.state.origin===''){
      this.getOriginAndWaypoints(route)
      return null;
    }
  }


	render() { 
    const {touristAttraction,route} = this.props
    const {currentPosition} = this.state;
		return (
      <div>
        <Alert touristAttraction={ touristAttraction } 
               currentPosition ={ currentPosition }
              route={ route } />
      </div>)
	}

}

const mapStateToProps = (state,props) => ({
  touristAttraction: Object.values(state.currentRoute)
})

export default connect(mapStateToProps)(Directions);
