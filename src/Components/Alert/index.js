import React from 'react';
import Modal from 'react-modal';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import './index.css'

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


class Alert extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
      modalIsOpen: false,
      touristAtt: {}
    }
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#006400';
  }

  componentDidUpdate(prevProps, prevState){
    const calcDistance = (current, points) => {
      return points.map(point => (
        window.google.maps.geometry.spherical.computeDistanceBetween(
          current,
          new window.google.maps.LatLng(point.latitude,point.longitude)
          ) / 1000
        ).toFixed(2)
      );
    }

    const currentPoint = new window.google.maps.LatLng(
                         this.props.currentPosition.lat, 
                         this.props.currentPosition.lng
                         );

    const {route} = this.props;
    const distanceFromCurrentPosition = calcDistance(currentPoint,route)

    if (distanceFromCurrentPosition.filter(e => e < 0.05).length > 0) {
      const existingTouristAttraction = distanceFromCurrentPosition.filter(e => e < 0.05)[0];
      const ind = distanceFromCurrentPosition.indexOf(existingTouristAttraction)
      const touristAtt = Object.values(this.props.touristAttraction)[ind];
      if(touristAtt===this.state.touristAtt){
        return;
      }
      if(!prevState.modalIsOpen) {
        this.setState({modalIsOpen: true,
                       touristAtt
        });
      }
    }
  }


  render(){
    return(
      <div>
        {Object.keys(this.state.touristAtt).length > 0 &&
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              <h3 className="FirstParagraph" ref={ subtitle => this.subtitle = subtitle }>
                Hey, we found this cool tourist attraction near you:
              </h3>
              <h3><MapsPlace className="SecondParagraph"/>
                      { this.state.touristAtt.name }
              </h3>
            </div>
            <div className='PhotoAndCloseButton'>
              <img src={ this.state.touristAtt.photo } alt=""></img>
              <button onClick={ this.closeModal } className="CloseButton" >close</button>
            </div>
            <p className="Description" >{ this.state.touristAtt.description }</p>
          </Modal>
        }
      </div>
    )
  }
}

export default Alert;



