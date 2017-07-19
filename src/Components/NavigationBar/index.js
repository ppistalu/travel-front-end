import React from 'react';
import AppBar from 'material-ui/AppBar';
import Public from 'material-ui/svg-icons/social/public';
import {withRouter} from 'react-router';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ButtonSimple from '../ButtonSimple';
import MediaQuery from 'react-responsive';

class NavigationBar extends React.Component {

	handleClick = (e) => {
	this.props.history.push(`/`);
	}

	render(){
		return(
		<div>
    <MediaQuery query='(max-device-width: 1224px)'>
      <MediaQuery query='(orientation: portrait)'>
      <AppBar
		  	iconElementLeft={<Public 
		  		onClick={this.handleClick} 
		  		style = {{cursor:'pointer',
		  				color:'black', 
		  				marginTop:'13px', 
		  				marginLeft:'50px'}} />}
		    style={{ backgroundColor:'white' }} titleStyle={{ color:'black' }}

		  > 
		  		<ButtonSimple text ={"Sign up"}/>
		  		<ButtonSimple text ={"Sign in"}/>
			  	<IconMenu
				    iconButtonElement={<IconButton><MapsPlace /></IconButton>}
				    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				    targetOrigin={{horizontal: 'left', vertical: 'top'}}
				    maxHeight={272}
				    style = {{marginTop:'8px'}}
			  	>
			       <MenuItem value="WI" primaryText="Find tourist attractions nearby" />
	    		   <MenuItem value="WY" primaryText="Find routes nearby" />
			   </IconMenu>
  		  </AppBar>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery minDeviceWidth={1224}>
      <MediaQuery query='(min-width: 1224px)'>
        <AppBar
		  	iconElementLeft={<Public 
		  		onClick={this.handleClick} 
		  		style = {{cursor:'pointer',
		  				color:'black', 
		  				marginTop:'13px', 
		  				marginLeft:'50px'}} />}
		    title="Travel the world"
		    style={{ backgroundColor:'white' }} titleStyle={{ color:'black' }}

		  > 
		  		<ButtonSimple text ={"Sign up"}/>
		  		<ButtonSimple text ={"Sign in"}/>
			  	<IconMenu
				    iconButtonElement={<IconButton><MapsPlace /></IconButton>}
				    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				    targetOrigin={{horizontal: 'left', vertical: 'top'}}
				    maxHeight={272}
				    style = {{marginTop:'8px'}}
			  	>
			       <MenuItem value="WI" primaryText="Find tourist attractions nearby" />
	    		   <MenuItem value="WY" primaryText="Find routes nearby" />
			   </IconMenu>
  		  </AppBar>
      </MediaQuery>
    </MediaQuery>
		</div>
	)}
}

export default (withRouter(NavigationBar));



