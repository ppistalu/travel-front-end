import React from 'react';
import {connect} from 'react-redux';
import {fetchSelectedRoute} from '../../Store/actions.js'
import RouteCard from '../../Components/RouteCard'
import NavigationBar from '../../Components/NavigationBar';

class RouteMap extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchSelectedRoute(this.props.match.params.id));

  }

  render(){
    if(Object.values(this.props.route)[0] === undefined) {
      console.log("in undefined")
      return null;
    }

    const {route} = this.props

    return(
      <div>
        <NavigationBar/>
        <div>
          <RouteCard  route = {route}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  route:state.currentRoute,
})

export default connect(mapStateToProps)(RouteMap);
