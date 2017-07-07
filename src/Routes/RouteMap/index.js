import React from 'react';
import {connect} from 'react-redux';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ChildMap from '../../ChildMap'
import Map from 'google-maps-react';

class RouteMap extends React.Component {
  render(){
  //     if(this.props.route[0]===undefined){
  //   return null;
  // }
    console.log(this.props.route[0])
    return(
      <div>
        <Map google = {window.google}  center={{ lat: 47.376887,lng: 8.541694}} style ={{width:'400px',height:'400px',margin:'auto'}}>

        {Object.values(this.props.route).map(info => 
          <ChildMap info = {info}/>
           )}
          </Map>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  route:state.currentRoute,
})

export default connect(mapStateToProps)(RouteMap);
