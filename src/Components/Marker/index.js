import React from 'react';

class Marker extends React.Component {

  componentDidUpdate = () => {
    console.log(this.props)
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

  // constructor(props) {
  //   super(props);
  //   console.log('in constructor');
  //   this.state = {
  //     pref: {
  //       map: this.props.map,
  //       position: this.props.center,
  //       // icon: icon,
  //       // label: label,
  //       title: this.props.title,
  //       // draggable: draggable
  //     }
  //   }
  // }
	render() {	
    console.log('in render')
    return null;
	}

}

export default Marker;

    