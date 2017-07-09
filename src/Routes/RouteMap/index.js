import React from 'react';
import {connect} from 'react-redux';
import ChildMap from '../../ChildMap';
import Map from 'google-maps-react';
import {fetchSelectedRoute} from '../../Store/actions.js'
import Marker from '../../Components/Marker'
import RouteCard from '../../Components/RouteCard'

class RouteMap extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchSelectedRoute(this.props.match.params.id));

  }

  render(){
    if(Object.values(this.props.route)[0] === undefined) {
      console.log("in undefined")
      return null;
    }
    const lat = Object.values(this.props.route)[0].latitude;
    const lng = Object.values(this.props.route)[0].longitude;
    console.log(Object.values(this.props.route))

    console.log(lat,lng)
    const center = { lat: lat,
                       lng: lng }
    return(
      <div>
        <Map google = {window.google}  
             initialCenter={center}
             style ={{width:'400px',height:'400px',margin:'auto'}}>
          {Object.values(this.props.route).map(e => 
            <Marker title = {e.name} key = {e.id} center = {{ lat: e.latitude,
                                lng: e.longitude }} />)}
        </Map>
        <RouteCard/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  route:state.currentRoute,
})

export default connect(mapStateToProps)(RouteMap);
