import React from 'react';

class Marker extends React.Component {

  // componentWillRecieveProps = () => {
      
  //       console.log("marker",this.props.title)
    

  // }

	render() {	
    const pref = {
      map: this.props.map,
      position: this.props.center,
      // icon: icon,
      // label: label,
      title: this.props.title,
      // draggable: draggable
    };
    new this.props.google.maps.Marker(pref);
    console.log("in render of marker",this.props.title)
    return null;
	}

}

export default Marker;

    