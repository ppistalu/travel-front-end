import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import TouristAttractionItem from '../TouristAttractionItem';
import {withRouter} from 'react-router';
import {fetchCurrentRouteInfo} from '../../Store/actions.js'
import Responsive from 'react-responsive';
 
// Default (desktop, tablet) and mobile setup 
const Default = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;

class TouristAttractionsList extends React.Component {

  componentDidMount = () => {
    const {id} = this.props.match.params
    this.props.dispatch(fetchCurrentRouteInfo(id))
  }

  render(){
    const {currentRouteInfo} = this.props.currentRouteInfo
    if(currentRouteInfo===undefined){
      return null;
    }
    const {route} = this.props
    return (
  <div>
    <Default>
      <Paper style = {{height: '300px',width:'800px'}}>
        <p style = {{marginTop:'10px', paddingTop:'10px', paddingLeft:'20px', fontWeight:'bold', fontSize:'28px'}}>
          Discover more about the main tourist attractions:
        </p>
        <div style = {{overflowY: 'scroll', height:'230px'}}>
          <TouristAttractionItem route = {route}/>
        </div>
      </Paper>
    </Default>
    <Mobile>
      <div style = {{width:'100%'}}>
        <p style = {{marginTop:'10px', paddingTop:'10px', 
                    paddingLeft:'20px', fontWeight:'bold', fontSize:'20px'}}>
          Discover more about the main tourist attractions:
        </p>
        <div style = {{overflowY: 'scroll', height:'300px'}}>
          <TouristAttractionItem route = {route}/>
        </div>
      </div>
    </Mobile>
    
  </div>

)}}

const mapStateToProps = (state) => ({
  route:state.currentRoute,
  currentRouteInfo:state.currentRouteInfo
})

export default connect(mapStateToProps)(withRouter(TouristAttractionsList));



