import React, { Component } from 'react';

class Marker extends Component {
	render() {	

    const pref = {
      map: this.props.map,
      position: this.props.center,
      // icon: icon,
      // label: label,
      title: this.props.title,
      // draggable: draggable
};
    var directionsService = new this.props.google.maps.DirectionsService();
    var directionsDisplay = new this.props.google.maps.DirectionsRenderer();
    const marker = new this.props.google.maps.Marker(pref);
		return null;
	}

}




export default Marker;