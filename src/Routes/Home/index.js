import React, { Component } from 'react';
import {fetchRoutes} from '../../Store/actions.js';
import {connect} from 'react-redux';
import HomeMapItem from '../../Containers/HomeMapItem/';
import {GridList} from 'material-ui/GridList';
import SignInUpButton from '../../Components/SignInUpButton';
import HomeSearchBar from '../../Components/HomeSearchBar';
import ButtonFlatWorldMap from '../../Components/ButtonFlatWorldMap';
import ParagraphOneHome from '../../Components/ParagraphOneHome';
import ParagraphTwoHome from '../../Components/ParagraphTwoHome';

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
        <GridList style = {styles.gridList} cols={2.2}>
      		{Object.values(routes).map(e => 
      			<HomeMapItem route ={e} key={e.id}/>
	      	)}
      	</GridList>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
	routes:state.routes,
})

export default connect(mapStateToProps)(Home);

const styles = {
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    width: '1000px',
    margin: '40px auto',
  },
};

