import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {GridTile} from 'material-ui/GridList';
import TouristAttractionItem from '../TouristAttractionItem';
import {withRouter} from 'react-router';
import {fetchCurrentRouteInfo} from '../../Store/actions.js'

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

    <Paper style = {{height: '300px',width:'800px'}}>

        <p style = {{marginTop:'10px', paddingTop:'10px', paddingLeft:'20px', fontWeight:'bold', fontSize:'28px'}}>
        Discover more about the main tourist attractions:
        </p>
      <div style = {{overflowY: 'scroll', height:'230px'}}>
        <TouristAttractionItem route = {route}/>
      </div>
    </Paper>
  </div>

)}}

const mapStateToProps = (state) => ({
  route:state.currentRoute,
  currentRouteInfo:state.currentRouteInfo
})

export default connect(mapStateToProps)(withRouter(TouristAttractionsList));



