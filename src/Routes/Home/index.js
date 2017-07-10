import React, { Component } from 'react';
import {fetchRoutes} from '../../Store/actions.js';
import {connect} from 'react-redux';
import HomeMapItem from '../../Components/HomeMapItem/index.js';
import {GridList} from 'material-ui/GridList';
import SignButton from '../../Components/SignButton';
import SearchBar from '../../Components/SearchBar';
import ButtonAddARoute from '../../Components/ButtonAddARoute';

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
        <SignButton/>
        <p style = {styles.paragraphOne}>Please select your destination...</p>
    	  <SearchBar options = {routes}/>
        <ButtonAddARoute text = {"Add a route"}/>
    	  <p style = {styles.paragraphTwo}>Or let yourself inspired by our most popular routes:</p>
        <GridList style={styles.gridList} cols={2.2}>
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
  paragraphOne: {
    fontSize:'35px', 
    fontWeight:'bold', 
    fontFamily:'sans-serif', 
    textAlign:'center', 
    marginTop:'120px'
  },
  paragraphTwo: {
    textAlign:'center', 
    marginTop:"60px"
  },
};	      	
