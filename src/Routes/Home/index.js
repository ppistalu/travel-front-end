import Map from 'google-maps-react';
import React, { Component } from 'react';
import {fetchRoutes} from '../../Store/actions.js';
import {connect} from 'react-redux';
import HomeMapItem from '../../Components/HomeMapItem/index.js'

class Home extends Component {

	componentDidMount() {
		this.props.dispatch(fetchRoutes());
	}

  render() {
  	const {routes} = this.props;
  	// if(routes[1]===undefined){
  	// 	console.log("goool")
  	// } return null;
  	  	//console.log(routes)
    return (
      	<div style = {{ height:"600px", overflow: "hidden",	whiteSpace: "nowrap", margin:"200px auto",
	width:"1200px"
}}>
      		{Object.values(routes).map(e => 
      			<HomeMapItem route ={e} key={e.id}/>
	      	)}	
      	</div>
    );
  }
}

const mapStateToProps = (state) => ({
	routes:state.routes,
})

export default connect(mapStateToProps)(Home);

	      	
