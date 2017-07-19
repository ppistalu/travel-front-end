import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MediaQuery from 'react-responsive';

const styles = {
 	button1: {
 		marginTop:'20px',
 		marginLeft: '40px',
 	},
 	button2: {
 		marginTop:'20px',
 		marginLeft: '20px',
 	},
 	div: {
 		display:"flex",
 	},
 	divCentral: {
 		diplay:'flex',
 		alignItems: "center",
    	justifyContent: "center",
    	marginLeft:'100px'
 	},
 	button: {
 		marginTop:'20px',
 		marginLeft: '20px',
 	},
 	button: {
 		marginTop:'20px',
 		marginLeft: '10px',
 	},

};

const SignInUpButton = (props) => (
	<div>
    <MediaQuery minDeviceWidth={1224}>
      <MediaQuery query='(min-width: 1224px)'>
        <div style = {styles.div}>
		    <RaisedButton style={styles.button1} label="Sign Up" primary={true} />
		    <RaisedButton style={styles.button2} label="Sign In" primary={true} />
  		</div>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 824px)'>
      <MediaQuery query='(orientation: portrait)'>
        <div style = {styles.divCentral}>
		    <RaisedButton style={styles.button} label="Sign Up" primary={false} />
		    <RaisedButton style={styles.button} label="Sign In" primary={false} />
  		</div>
      </MediaQuery>
      <MediaQuery query='(orientation: landscape)'>
        <div style = {styles.div}>
		    <RaisedButton style={styles.button1} label="Sign Up" primary={true} />
		    <RaisedButton style={styles.button2} label="Sign In" primary={true} />
  		</div>
      </MediaQuery>
    </MediaQuery>
  </div>
);

export default SignInUpButton;
