import React, { Component } from 'react';
import {connect} from 'react-redux';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {withRouter} from 'react-router';
import './index.css';

class HomeMapItem extends Component {

   constructor(props) {
    super(props);
    this.state = {
      selectedRoute: ''
    }
  }

  handleClick = (e) => {
    const id = this.props.route.id;
    this.props.history.push(`/route/${id}`);
  }
  

  render() {
    const {name} = this.props.route;
    const {photo} = this.props.route;
    const {id} = this.props.route;
    return (
        <GridTile style = {{marginLeft:"20px", cursor:'pointer'}} 
          key={id} onClick={this.handleClick}
          title={name}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" />
          </IconButton>}
          className = "titleStyle"
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={photo} alt=''/>
        </GridTile>
    );
  }
}

export default connect()(withRouter(HomeMapItem));
