import React, { Component } from 'react';
import {fetchRoutes} from '../../Store/actions.js';
import {connect} from 'react-redux';
import HomeMapItem from '../../Components/HomeMapItem/index.js';
import {GridList} from 'material-ui/GridList';
import RaisedButtonExampleSimple from '../../Components/Button';
import AutoCompleteExampleSimple from '../../Components/SearchBar';
import FlatButtonExampleComplex from '../../Components/CreateARoute';

const buttonValue = "Add a route";

class Home extends Component {

	componentDidMount() {
		this.props.dispatch(fetchRoutes());
	}

  render() {
  	const {routes} = this.props;
    //console.log(routes)
    if(routes[1]===undefined){
      return null;
    }
    return (
    	<div>
        <RaisedButtonExampleSimple value = {buttonValue}/>
        <p style = {{fontSize:'35px', fontWeight:'bold', fontFamily:'sans-serif', textAlign:'center', marginTop:'80px'}}>Please select your destination...</p>
    	  <AutoCompleteExampleSimple options = {routes}/>
        <FlatButtonExampleComplex/>
    	  <p style ={{textAlign:'center', marginTop:"40px"}}>Or let yourself inspired by our most popular routes:</p>
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
};	      	
