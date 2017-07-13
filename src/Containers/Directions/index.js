import React, { Component } from 'react';
import {connect} from 'react-redux';
import {userCurrentPosition} from '../../Store/actions.js';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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
    this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  success = (pos) => {
    console.log(pos)
    if(pos.coords.latitude===this.state.currentPosition.lat){
      return null;
    }
    this.setState({currentPosition:{
      lat:pos.coords.latitude,
      lng:pos.coords.longitude,
    }})
    console.log('in da success');
    console.log(pos.coords.latitude)
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
          }, () => {
            alert("Hey, can't get your location. Origin will not be set to your current location.");
            this.setState({origin: this.convert(this.props.route[0]), 
                          destination: this.convert(this.props.route[this.props.route.length-1]),
                          waypoints: this.props.route.slice(1,(this.props.route.length-1)).map(e => ({
                            location: {lat : e.latitude, lng : e.longitude},
                            stopover: true})) 
                        });
          });
        } else {
          // Browser doesn't support Geolocation
          this.setState({origin: this.convert(route[0]), 
                        destination: this.convert(route[route.length-1]),
                        waypoints: route.slice(1,(route.length-1)).map(e => ({
                          location: {lat : e.latitude, lng : e.longitude},
                          stopover: true })) 
                        })
        }
        
    }

  componentDidUpdate = (prevProps, prevState) => {
    console.log(this.props.touristAttraction);
    const route = this.props;
    if(this.state.origin===''){
      this.getOriginAndWaypoints(route)
      return null;
    }

    const p1 = new this.props.google.maps.LatLng(this.state.currentPosition.lat, this.state.currentPosition.lng);
    const p2 = this.props.route;
    const calcDistance = (p1, p2) => {
      return p2.map(e => (this.props.google.maps.geometry.spherical.computeDistanceBetween(p1, 
        new this.props.google.maps.LatLng(e.latitude,e.longitude)
        ) / 1000).toFixed(2));
    }

    const distanceFromCurrentPosition = calcDistance(p1,p2)

    const nearByWithoutFilter = this.props.touristAttraction.map((e,index) => {
      e["distance"]= distanceFromCurrentPosition[index]
      return {e};
    }

    const nearBy = nearByWithoutFilter.filter(e => e.distance < 2);

    console.log(nearBy);
    if(nearBy.length>0) {
      if(!prevState.modalIsOpen) {  
        this.setState({modalIsOpen: true});
      }
      if(!prevState.touristAtt) {  
        this.setState({touristAtt:nearBy[0]});
      }
    }

    this.directionsDisplay.setMap(this.props.map);
    this.directionsService.route({
          origin: this.state.origin,
          destination: this.state.destination,
          travelMode: 'WALKING',
          waypoints: this.state.waypoints,
        },(response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  }


	render() { 
    console.log(this.state.props)
		return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Hey, we found this cool tourist attraction near you:</h2>
          <button onClick={this.closeModal}>close</button>
          {Object.values(this.state.touristAtt).length > 0 &&
            <div>{this.state.touristAtt.name}</div>
          }

          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
        <div style={{zIndex: '100000', position: 'relative', top:'-20px'}}>
        </div>
      </div>)
	}

}

const mapStateToProps = (state,props) => {
    touristAttraction: Object.values(state.currentRoute)
  }
}

export default connect(mapStateToProps)(Directions);





 
    
  
