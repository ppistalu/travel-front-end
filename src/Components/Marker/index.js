import React from 'react';

class Marker extends React.Component {

  componentDidUpdate = () => {
      const pref = {
      map: this.props.map,
      position: this.props.center,
      // icon: icon,
      // label: label,
      title: this.props.title,
      // draggable: draggable
    };
    new this.props.google.maps.Marker(pref);
  }

	render() {	
    return null;
	}

}

export default Marker;

    