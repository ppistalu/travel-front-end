import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import HalfStar from 'material-ui/svg-icons/toggle/star-half';
import Star from 'material-ui/svg-icons/toggle/star';

const styles = {
  titleStyle: {
    color: 'rgb(0, 188, 212)',
    width: '100px'
  },
};

class TouristAttractionsList extends React.Component {

    averageCalculator = (reviews) => {
    let totalReviews = 0;
    for (let i=0; i<reviews.length; i++) {
        totalReviews += reviews[i].rate;
      }
    const average = totalReviews / reviews.length;
    return average;
  }

  averageStarsRender = (average) => {
    let stars=[];
    for (let i=1; i<=5; i++) {
      if (i <= average) {
        stars.push(<Star key={i} color="yellow" />)
      } else if (i - average > 0.01 && i - average < 0.99) {
        stars.push(<HalfStar key={i} color="yellow" />)
      } else {
        stars.push(<StarBorder key={i} color="grey" />)
      }
    }
    return <p>{stars}</p>;
  }
  render(){
    const {route} = this.props
    console.log(route)
    const reviews = 3;
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
        <div style = {{marginLeft:'30px'}}> {this.averageStarsRender(this.averageCalculator(reviews))} 
        </div> 
      </div>
      <div style = {{marginTop:'30px',width:'200px', height:'180px', alignSelf:'right'}}>
        <GridTile 
            title='text'
            titleStyle="title"
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
            <img src= "https://cdn.zuerich.com/sites/default/files/styles/split_screen_big/public/keyvisual/web_zurich_museum_zoologischesmuseum_01.jpg?itok=Xm7-rX98&timestamp=1447940046" />
          </GridTile>
      </div>
    </Paper>

    <div style = {{marginLeft:'30px', fontWeight:'bold', marginTop:'30px'}}>Discover more about the main tourist attractions from your selected route:</div>
    <div style = {{overflowY: 'scroll', height: '400px', marginTop:'50px',width:'800px'}}>
      <Paper >
        {Object.values(route).map(e => 
        <Card >
          <FlatButton style = {{marginTop:'15px', marginLeft:'15px', marginBottom:'10px'}}label={e.name} />
          <CardText>
            {e.description}
          </CardText>
            <CardActions>
               <FlatButton style = {{marginLeft:'15px', marginBottom:'10px'}}label="Other routes containing this attraction" />
            </CardActions>
        </Card>)}
      </Paper>
    </div>
  </div>

)}}

const mapStateToProps = (state) => ({
  route:state.currentRoute,
  name:state.routes
})

export default connect(mapStateToProps)(TouristAttractionsList);