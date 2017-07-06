import React, { Component } from 'react';

class ChildMap extends Component {


	render() {	
    var directionsService = new this.props.google.maps.DirectionsService();
    var directionsDisplay = new this.props.google.maps.DirectionsRenderer();
    directionsDisplay.setMap(this.props.map);
    if(this.props.map===undefined){
    	return null;
    }
    else {console.log(this.props.map.center.lat())}
      directionsService.route({
          origin: 'basel',
          destination: 'zurich',
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
		return(
			<div>
			</div>
		)
	}

}

export default ChildMap;