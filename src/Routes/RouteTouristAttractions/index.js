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
    if(Object.values(this.props.route)[0] === undefined) {
      return null;
    }

    const {route} = this.props

    return(
      <div>
        <NavigationBar/>
        <div>
          <GoogleMaps route = {route}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  route:state.currentRoute,
})

export default connect(mapStateToProps)(RouteTouristAttractions);
