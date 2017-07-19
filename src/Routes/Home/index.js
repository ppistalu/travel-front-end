import React, { Component } from 'react';
import {fetchRoutes} from '../../Store/actions.js';
import {connect} from 'react-redux';
import SignInUpButton from '../../Components/SignInUpButton';
import HomeSearchBar from '../../Components/HomeSearchBar';
import ButtonFlatWorldMap from '../../Components/ButtonFlatWorldMap';
import ParagraphOneHome from '../../Components/ParagraphOneHome';
import ParagraphTwoHome from '../../Components/ParagraphTwoHome';
import RoutesImages from '../../Components/RoutesImages';

class Home extends Component {

	componentDidMount() {
		this.props.dispatch(fetchRoutes());
	}

  render() {
  	const {routes} = this.props;
    if(routes[1]===undefined){
      return null;
    }
    return (
    	<div>
        <SignInUpButton/>
        <ParagraphOneHome/>
    	  <HomeSearchBar options = {routes}/>
        <ButtonFlatWorldMap text = {"Add a route"}/>
    	  <ParagraphTwoHome/>
        <RoutesImages routes = {routes}/>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
	routes:Object.values(state.routes),
})

export default connect(mapStateToProps)(Home);

