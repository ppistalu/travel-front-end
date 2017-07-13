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
    transform             : 'translate(-50%, -50%)',
    width                 : '600px'
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
    console.log('in da success')
    if(pos.coords.latitude===this.state.currentPosition.lat){
      console.log("same pos")
      return null;
    }
    this.setState({currentPosition:{
      lat:pos.coords.latitude,
      lng:pos.coords.longitude,
    }})
    this.props.dispatch(userCurrentPosition({
      lat:pos.coords.latitude,
      lng:pos.coords.longitude,
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

    getOriginAndWaypoints = (values) => {

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition( (position) => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.setState({currentPosition:pos,
                          origin:pos, 
                          destination: this.convert(values[values.length-1]),
                          waypoints: values.slice(0, -1).map(e =>({
                                    location: {lat : e.latitude, lng : e.longitude},
                                    stopover: true }))
                        });
            this.props.dispatch(userCurrentPosition(pos))
          }, () => {
            alert("Hey, can't get your location. Origin will not be set to your current location.");
            this.setState({origin: this.convert(values[0]), 
                          destination: this.convert(values[values.length-1]),
                          waypoints: values.slice(1,(values.length-1)).map(e => ({
                            location: {lat : e.latitude, lng : e.longitude},
                            stopover: true})) 
                        });
          });
        } else {
          // Browser doesn't support Geolocation
          this.setState({origin: this.convert(values[0]), 
                        destination: this.convert(values[values.length-1]),
                        waypoints: values.slice(1,(values.length-1)).map(e => ({
                          location: {lat : e.latitude, lng : e.longitude},
                          stopover: true })) 
                        })
        }
        
    }

  componentDidUpdate = (prevProps, prevState) => {
    console.log(this.props.touristAttraction);
    const {route} = this.props;
    const values = Object.values(route);
    if(this.state.origin===''){
      this.getOriginAndWaypoints(values)
      return null;
    }
    var currentPoint = new this.props.google.maps.LatLng(this.state.currentPosition.lat, this.state.currentPosition.lng);
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
    // console.log(distanceFromCurrentPosition)
    //this.setState({distanceFromCurrentPosition});

    if(distanceFromCurrentPosition.filter(e => e < 2).length > 0) {
      const existingTouristAttraction = distanceFromCurrentPosition.filter(e => e < 2)[0];
      console.log('in da true')
      console.log(this.state.currentPosition)
      const ind = distanceFromCurrentPosition.indexOf(existingTouristAttraction)
      if(!prevState.modalIsOpen) {  
        this.setState({modalIsOpen: true});
      }
    // if(Object.values(this.props.touristAttraction[ind])===undefined){
    //     return null;
    //   }
    const touristAtt = Object.values(this.props.touristAttraction)[ind];
    if(!prevState.modalIsOpen) {  
    this.setState({touristAtt});
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
    console.log(Object.values(this.state.touristAtt).length)
		return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        {Object.values(this.state.touristAtt).length > 0 &&
          <div>
            <h2 ref={subtitle => this.subtitle = subtitle}>Hey, we found this cool tourist attraction near you:
            </h2>
            <h3 style ={{textAlign:'center'}}>{this.state.touristAtt.name}</h3>
          </div>
          }
          
          <button onClick={this.closeModal}>close</button>
          {Object.values(this.state.touristAtt).length > 0 &&
            <div>{this.state.touristAtt.description}</div>
          }

        </Modal>
        <div style={{zIndex: '100000', position: 'relative', top:'-20px'}}>
        </div>
      </div>)
	}

}

const mapStateToProps = (state) => ({
  touristAttraction: state.currentRoute,
})

export default connect(mapStateToProps)(Directions);





 
    
  
