import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import Public from 'material-ui/svg-icons/social/public';

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
    margin: '0 auto',
    marginTop: '100px'
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const FlatButtonExampleComplex = () => (
  <div style = {{display:'flex'}}>
    <FlatButton
      label="Add a route"
      labelPosition="before"
      style={styles.uploadButton}
      containerElement="label"
      icon={<Public />}
    >
    </FlatButton>
  </div>
);

export default FlatButtonExampleComplex;