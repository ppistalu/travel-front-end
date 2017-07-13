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
      Object.values(this.props.route).forEach(e => {
        bound.extend( new window.google.maps.LatLng(e.latitude, e.longitude))
      });
      this.setState({center : { lat: bound.getCenter().lat(),
                       lng: bound.getCenter().lng() }
      })
    }

  render(){
    console.log('in da render')
    console.log(this.props.currentPosition)
    const {route} = this.props
    if(Object.values(route)[0]===undefined){
      console.log('in undefined render')
    	return null;
    }
    console.log(Object.keys(this.props.currentPosition).length)
    const currentPosition = this.props.currentPosition;
    const that = this.props.currentPosition
    return(
      <div>
       	<Map google = {window.google}
            initialCenter={this.state.center} 
            center={this.state.center} 
            style ={{width:'400px',height:'400px',margin:'auto'}}>
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

// {unreadMessages.length > 0 &&
//         <h2>
//           You have {unreadMessages.length} unread messages.
//         </h2>
// }


