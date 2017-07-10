import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const ButtonSimple = (props) => (
  <div>
    <FlatButton style = {{marginTop:'15px'}} label= {props.text} />
  </div>
);

export default ButtonSimple;