import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedRoute} from '../../Store/actions.js'
import GoogleMaps from '../../Containers/GoogleMaps'
import NavigationBar from '../../Components/NavigationBar';

class RouteTouristAttractions extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchSelectedRoute(this.props.match.params.id));
  }

  render(){

    if (!this.props.routes.length) {
      return null;
    }

    const {routes} = this.props
    return(
      <div>
        <NavigationBar/>
        <div>
          <GoogleMaps routes={routes}/>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => ({
  routes: Object.values(state.currentRoute),
})

export default connect(mapStateToProps)(RouteTouristAttractions);
