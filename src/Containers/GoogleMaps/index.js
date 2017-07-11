import React from 'react';
import Marker from '../../Components/Marker'
import Map from 'google-maps-react';
import TouristAttractionsList from '../TouristAttractionsList'
import ButtonFlatWorldMap from '../../Components/ButtonFlatWorldMap';
import Paper from 'material-ui/Paper'; 
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class GoogleMaps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: '',
        lng: '',
      }
    }
  }

    handleStart = (e) => {
      const {id} = this.props.match.params
      this.props.history.push(`/route/start/${id}`);
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
      return(
        <div style = {{margin:'0px auto', display:'flex',justifyContent:"center"}}>
          <div style = {{ marginLeft:'3px'}}>
            <Paper style ={{width:'400px',height:'500px',marginTop:'30px'}} zDepth={5}>
                <Map google = {window.google}  
                     initialCenter={this.state.center}
                     center={this.props.info}
                     containerStyle={{width:'400px', height:'500px'}}
                     style ={{width:'100%',height:'100%',display:'inline-block'}}>
                  {Object.values(this.props.route).map(e => 
                    <Marker title = {e.name} key = {e.id} center = {{ lat: e.latitude,
                                        lng: e.longitude }} />)
                    }
                </Map>
            </Paper>
            <ButtonFlatWorldMap onClick={this.handleStart} text = {"Start!"}/>
          </div>
          <div style = {{marginLeft:'20px', marginTop:'10px'}}>
            <TouristAttractionsList/>
          </div>
        </div>
      )
    }
}

const mapStateToProps = (state) => ({
  info:state.changeCenter,
})

export default connect(mapStateToProps)(withRouter(GoogleMaps));

