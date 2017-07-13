import React, { Component } from 'react';
import {connect} from 'react-redux';
import {userCurrentPosition} from '../../Store/actions.js';
import Modal from 'react-modal';
import Public from 'material-ui/svg-icons/social/public';
import MapsPlace from 'material-ui/svg-icons/maps/place';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '300px',
    height                : '400px',
    textAlign             : 'center',
  }
};

class Directions extends Component {

  constructor(props) {
    super(props);
    this.state = {
        origin: '',
        waypoint: [],
        destination: '',
        currentPosition: {
          lat: "",
          lng: "",
        },
        distanceFromCurrentPosition: [],
        modalIsOpen: false,
        touristAtt: {}
      }
  }


  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#006400';
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  success = (pos) => {
    if(pos.coords.latitude===this.state.currentPosition.lat){
      return null;
    }
    this.setState({currentPosition:{
      lat:pos.coords.latitude,
      lng:pos.coords.longitude,
    }})
    this.props.dispatch(userCurrentPosition({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    }))
  }

  error = (err) => {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  id = navigator.geolocation.watchPosition(this.success, this.error, this.options);

  directionsService = new this.props.google.maps.DirectionsService();
  directionsDisplay = new this.props.google.maps.DirectionsRenderer();

  convert = (route) => ({
    lat: route.latitude,
    lng: route.longitude,
  })

    showDirection = () => {
      this.directionsDisplay.setMap(this.props.map);
      this.directionsService.route({
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: 'WALKING',
      waypoints: this.state.waypoints,
        }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    }

    getOriginAndWaypoints = (route) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition( (position) => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.setState({currentPosition:pos,
                          origin:pos, 
                          destination: this.convert(this.props.route[this.props.route.length-1]),
                          waypoints: this.props.route.slice(0, -1).map(e =>({
                                    location: {lat : e.latitude, lng : e.longitude},
                                    stopover: true }))
                        });
            this.props.dispatch(userCurrentPosition(pos))
            this.showDirection()
          }, () => {
            alert("Hey, can't get your location. Origin will not be set to your current location.");
            this.setState({origin: this.convert(this.props.route[0]), 
                          destination: this.convert(this.props.route[this.props.route.length-1]),
                          waypoints: this.props.route.slice(1,(this.props.route.length-1)).map(e => ({
                            location: {lat : e.latitude, lng : e.longitude},
                            stopover: true})) 
                        });
          this.showDirection()
          });
        } else {
          // Browser doesn't support Geolocation
          this.setState({origin: this.convert(route[0]), 
                        destination: this.convert(route[route.length-1]),
                        waypoints: route.slice(1,(route.length-1)).map(e => ({
                          location: {lat : e.latitude, lng : e.longitude},
                          stopover: true })) 
                        })
          this.showDirection()
        }
        
    }

  componentDidUpdate = (prevProps, prevState) => {
    const {route} = this.props;
    const values = Object.values(route)
    if(this.state.origin===''){
      this.getOriginAndWaypoints(route)
      return null;
    }
    const currentPoint = new this.props.google.maps.LatLng(
                         this.state.currentPosition.lat, 
                         this.state.currentPosition.lng
                         );
    const calcDistance = (current, points) => {
      return points.map(point => (
          this.props.google.maps.geometry.spherical.computeDistanceBetween(
            current,
            new this.props.google.maps.LatLng(point.latitude,point.longitude)
          ) / 1000
        ).toFixed(2)
      );
    }

    const distanceFromCurrentPosition = calcDistance(currentPoint,values)

    if (distanceFromCurrentPosition.filter(e => e < 0.05).length > 0) {
      const existingTouristAttraction = distanceFromCurrentPosition.filter(e => e < 0.05)[0];
      const ind = distanceFromCurrentPosition.indexOf(existingTouristAttraction)
      const touristAtt = Object.values(this.props.touristAttraction)[ind];
      if(!prevState.modalIsOpen) {
        this.setState({modalIsOpen: true,
                       touristAtt
        });
      }
    }

  }


	render() { 
		return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
              <h2 ref={ subtitle => this.subtitle = subtitle }>
                Hey, we found this cool tourist attraction near you:
              </h2>
              {Object.keys(this.state.touristAtt).length > 0 &&
                <h3 style ={ {textAlign:'center'} }><MapsPlace style={{marginRight:'5px'}}/>
                  {this.state.touristAtt.name}
                </h3>
              }
          </div>
          <button onClick={this.closeModal}>close</button>
          {Object.keys(this.state.touristAtt).length > 0 &&
            <p style ={ {textAlign:'center'} }>{this.state.touristAtt.description}</p>
          }
        </Modal>
      </div>)
	}

}

const mapStateToProps = (state,props) => ({
  touristAttraction: Object.values(state.currentRoute)
})

export default connect(mapStateToProps)(Directions);
