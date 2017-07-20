import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import HomeMapItemComponent from '../../Components/HomeMapItemComponent'

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
    const handleClick = this.handleClick;
    return (
      <HomeMapItemComponent handleClick={ handleClick }
                   name={ name } 
                   id={ id } 
                   photo={ photo }/>
    );
  }
}

export default connect()(withRouter(HomeMapItem));
