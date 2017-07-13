import React from 'react';
import Directions from '../../Containers/Directions'
import Map,{Marker} from 'google-maps-react';
import {connect} from 'react-redux';


class NavigationMap extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      center: {
	        lat: '',
	        lng: '',
	      }
	    }
  	}

   componentWillMount = () => {
      const bound = new window.google.maps.LatLngBounds();
      this.props.route.forEach(e => {
        bound.extend( new window.google.maps.LatLng(e.latitude, e.longitude))
      });
      this.setState({center : { lat: bound.getCenter().lat(),
                       lng: bound.getCenter().lng() }
      })
    }

  render(){
    const {route} = this.props
    if(route[0]===undefined){
    	return null;
    }


    return(
      <div>
       	<Map google = {window.google}
            initialCenter={this.state.center} 
            center={this.state.center} 
            style ={{}}>
            <Directions route={route} />
            <Marker position={this.props.currentPosition}/>
        </Map>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPosition: state.currentPosition,
})

export default connect(mapStateToProps)(NavigationMap);



