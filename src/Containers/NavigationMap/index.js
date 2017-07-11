import React from 'react';
import Directions from '../../Containers/Directions'
import Map from 'google-maps-react';

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
      Object.values(this.props.route).forEach(e => {
        bound.extend( new window.google.maps.LatLng(e.latitude, e.longitude))
      });
      this.setState({center : { lat: bound.getCenter().lat(),
                       lng: bound.getCenter().lng() }
      })
    }

  render(){
    const {route} = this.props
    if(Object.values(route)[0]===undefined){
    	return null;
    }
    return(
      <div>
       	<Map google = {window.google}
            initialCenter={this.state.center} 
            style ={{width:'400px',height:'400px',margin:'auto'}}>
            <Directions route = {route} />
        </Map>
      </div>
    )
  }
}


export default NavigationMap;
