import React from 'react';
import {connect} from 'react-redux';
import { CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {GridTile} from 'material-ui/GridList';
import TouristAttractionItem from '../../Components/TouristAttractionItem';

class TouristAttractionsList extends React.Component {

  render(){
    const {route} = this.props
    return (
  <div>

    <Paper style = {{ display: 'flex', marginTop:'20px'}} zDepth={3}>
      <div style = {{width:'570px'}}>
        <FlatButton style = {{marginTop:'15px', marginLeft:'15px'}}label='name' />
        <CardText>
          <p>Description:</p>
          <p>Duration:</p>
          <p>Difficulty:</p>
        </CardText>

      </div>
      <div style = {{marginTop:'5px',width:'200px', height:'180px', alignSelf:'right'}}>
        <GridTile 
            title='text'
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
            <img alt ="" 
              src= "https://cdn.zuerich.com/sites/default/files/styles/split_screen_big/public/keyvisual/web_zurich_museum_zoologischesmuseum_01.jpg?itok=Xm7-rX98&timestamp=1447940046" />
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
//            <img style = {{maxHeight:'80px'}}src={e.photo} alt = ""/>

const mapStateToProps = (state) => ({
  route:state.currentRoute,
})

export default connect(mapStateToProps)(TouristAttractionsList);



