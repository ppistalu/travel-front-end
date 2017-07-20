import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {GridTile} from 'material-ui/GridList';
import {withRouter} from 'react-router';
import {fetchCurrentRouteInfo} from '../../Store/actions.js';
import Responsive from 'react-responsive';
 
// Default (desktop, tablet) and mobile setup 
const Default = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;

class RouteInfo extends React.Component {

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
    <Paper style = {{ display: 'flex', marginTop:'20px', alignItems: 'center'}} zDepth={3}>
      <div style = {{width:'570px'}}>
        <p style={{marginLeft:'30px', fontWeight:'bold'}}>{currentRouteInfo.name}</p>
        <div style = {{marginLeft:"20px"}}>
          <p style={{marginTop:'0px'}}><strong>Description:</strong>{currentRouteInfo.description}</p>
          <p><strong>Duration:</strong>{" " + currentRouteInfo.duration + " hours"}</p>
          <p><strong>Difficulty:</strong>{" " + currentRouteInfo.difficulty}</p>
        </div>
      </div>

      <div style = {{width:'200px', height:'180px'}}>
        <GridTile 
            title={currentRouteInfo.name}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
            <img src= {currentRouteInfo.photo} alt ="" />
          </GridTile>
      </div>
    </Paper>
    </Default>
    <Mobile>
      <div style = {{marginBottom:'10px',display:'flex nowrap', width:'100%'}}>
        <p style={{marginLeft:'90px',fontWeight:'bold', marginBottom:'10px'}}>{currentRouteInfo.name}</p>
        <GridTile 
            style = {{marginLeft:'55px',width:'200px', height:'180px', marginBottom:'10px'}}
            title={currentRouteInfo.name}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src= {currentRouteInfo.photo} alt ="" />
        </GridTile>
        <div style = {{marginLeft:"2px"}}>
          <p style={{marginTop:'0px'}}><strong>Description:</strong>{" " + currentRouteInfo.description}</p>
          <p><strong>Duration:</strong>{" " + currentRouteInfo.duration + " hours"}</p>
          <p><strong>Difficulty:</strong>{" " + currentRouteInfo.difficulty}</p>
        </div>
      </div>
    </Mobile>
  </div>

)}}

const mapStateToProps = (state) => ({
  currentRouteInfo:state.currentRouteInfo
})

export default connect(mapStateToProps)(withRouter(RouteInfo));



