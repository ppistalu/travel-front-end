import { Component } from 'react';

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
    console.log(this.state)
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

export default Directions;