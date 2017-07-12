import React from 'react';
import NavigationBar from '../../Components/NavigationBar';
import {connect} from 'react-redux';
import {fetchCurrentRouteInfo} from '../../Store/actions.js';
import {fetchSelectedRoute} from '../../Store/actions.js';
import NavigationMap from '../../Containers/NavigationMap';

// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };

class StartedRoute extends React.Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
  }

  // openModal = () => {
  //   //console.log("opened");
  //   this.setState({modalIsOpen: true});
  // }

  // afterOpenModal = () => {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = '#f00';
  // }

  // closeModal = () => {
  //   this.setState({modalIsOpen: false});
  // }

  componentDidMount = () => {
  	const {id} = this.props.match.params;
    this.props.dispatch(fetchCurrentRouteInfo(id));
    this.props.dispatch(fetchSelectedRoute(id));
  }

  render(){
    const {route} = this.props
    if(Object.values(route)[0]===undefined){
    	return null;
    }
    return(
      <div>
      	<NavigationBar/>
       	<NavigationMap route={route}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
	routeInfo:state.currentRouteInfo,
	route:state.currentRoute
})


export default connect(mapStateToProps)(StartedRoute);


    
        // <Modal
        //   isOpen={this.state.modalIsOpen}
        //   onAfterOpen={this.afterOpenModal}
        //   onRequestClose={this.closeModal}
        //   style={customStyles}
        //   contentLabel="Example Modal"
        // >
        //   <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
        //   <button onClick={this.closeModal}>close</button>
        //   <div>I am a modal</div>
        //   <form>
        //     <input />
        //     <button>tab navigation</button>
        //     <button>stays</button>
        //     <button>inside</button>
        //     <button>the modal</button>
        //   </form>
        // </Modal>
        // <div style={{zIndex: '100000', position: 'relative', top:'-20px'}}>
        //   <button onClick={this.openModal}>Open Modal</button>  
        //import Modal from 'react-modal';

