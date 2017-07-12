import React from 'react';
import Marker  from 'google-maps-react';

class MyMarker extends React.Component {

    render(){
    	if(Object.values(this.props.currentPosition).length === 0){
    		return null;
    	}
    	console.log("aici",this.props.currentPosition)
    	console.log(this.props.map.mapCenter)
      return(
        	<Marker map={this.props.map} google={this.props.google} position={this.props.currentPosition}/>
      )
    }

}


export default MyMarker;



