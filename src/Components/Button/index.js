import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
 	button1: {
 		marginTop:'20px',
 		marginLeft: '40px',
 	},

 	button2: {
 		marginTop:'20px',
 		marginLeft: '20px',
 	}
};

const RaisedButtonExampleSimple = (props) => (
  <div style = {{display:"flex"}}>
    <RaisedButton style={styles.button1} label="Sign Up" primary={true} />
    <RaisedButton style={styles.button2} label="Sign In" primary={true} />
  </div>
);

export default RaisedButtonExampleSimple;

    // <RaisedButton label="Sign Up" primary={true} style={style} />
    // <RaisedButton label="Add a route" primary={true} style={style} />