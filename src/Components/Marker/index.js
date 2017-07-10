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
    const marker = new this.props.google.maps.Marker(pref);
		return null;
	}

}

export default Marker;

//     const pref = {
//       map: this.props.map,
//       position: this.props.center,
//       // icon: icon,
//       // label: label,
//       title: this.props.title,
//       // draggable: draggable
// };