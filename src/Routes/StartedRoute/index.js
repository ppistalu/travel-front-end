import React from 'react';
import NavigationBar from '../../Components/NavigationBar';
import {connect} from 'react-redux';
import {fetchCurrentRouteInfo} from '../../Store/actions.js';
import {fetchSelectedRoute} from '../../Store/actions.js';
import NavigationMap from '../../Containers/NavigationMap';

class StartedRoute extends React.Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
  }

  componentDidMount = () => {
  	const {id} = this.props.match.params;
    this.props.dispatch(fetchCurrentRouteInfo(id));
    this.props.dispatch(fetchSelectedRoute(id));
  }

  render(){
    const {route} = this.props
    if(route[0]===undefined){
    	return null;
    }
    return(
      <div>
      	<NavigationBar/>
       	<NavigationMap route={route}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
	routeInfo:state.currentRouteInfo,
	route:Object.values(state.currentRoute)
})


export default connect(mapStateToProps)(StartedRoute);



