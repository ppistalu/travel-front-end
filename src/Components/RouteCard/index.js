import React from 'react';
import Marker from '../Marker'
import Map from 'google-maps-react';
import Paper from 'material-ui/Paper';
import TouristAttractionsList from '../../Containers/RouteDescription'
import FlatButton from 'material-ui/FlatButton';
import ButtonAddARoute from '../../Components/ButtonAddARoute'


class RouteCard extends React.Component {
    render(){
    const lat = Object.values(this.props.route)[0].latitude;
    const lng = Object.values(this.props.route)[0].longitude;
    const center = { lat: lat,
                       lng: lng }
  return(
  <div style = {{margin:'0px auto', display:'flex',justifyContent:"center"}}>
    <div style = {{ marginLeft:'3px'}}>
      <Paper style ={{width:'400px',height:'500px',marginTop:'30px'}} zDepth={5}>
          <Map google = {window.google}  
               initialCenter={center}
               containerStyle={{width:'400px', height:'500px'}}
               style ={{width:'100%',height:'100%',display:'inline-block'}}>
            {Object.values(this.props.route).map(e => 
              <Marker title = {e.name} key = {e.id} center = {{ lat: e.latitude,
                                  lng: e.longitude }} />)}
          </Map>
      </Paper>
      <ButtonAddARoute text = {"Start!"}/>
    </div>
    <div style = {{marginLeft:'20px', marginTop:'10px'}}>
      <TouristAttractionsList/>
    </div>
  </div>
)
}}

export default RouteCard;

