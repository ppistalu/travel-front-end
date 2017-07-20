import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationBar from '../NavigationBar'
import Responsive from 'react-responsive';
 
// Default (desktop, tablet) and mobile setup 
const Default = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;


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
};

const SignInUpButton = (props) => (
	<div>
    <Default style = {styles.div}>
        <RaisedButton style={styles.button1} label="Sign Up" primary={true} />
        <RaisedButton style={styles.button2} label="Sign In" primary={true} />
    </Default>
    <Mobile><NavigationBar/></Mobile>
  </div>
);

export default SignInUpButton;

