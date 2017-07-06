import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './index.css';

class HomeMapItem extends Component {
  render() {
    const {name} = this.props.route;
    const {photo} = this.props.route;
    console.log(name);
    console.log(photo);
    return (
      	<div className = "HomeMapItem" style = {{marginLeft: "20px",height:"300px",display: "inline-block"}} >
  <Card>
    <CardHeader style = {{text:"center"}}
      title={name}
    
    />
    <CardMedia style = {{position: "relative" }}>
    <div style={{height:"150px"}}>
      <img src={photo} alt="" style = {{height: "auto", width: "auto", maxWidth: "350px", maxHeight: "100px",display: "inline-block"}}/>
    </div>
    </CardMedia>
    <CardText> Description to be added
    </CardText>
    <CardActions>
      <FlatButton label="View this route" />
    </CardActions>
  </Card>
        </div>
    );
  }
}

export default HomeMapItem;