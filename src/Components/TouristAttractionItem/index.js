import React from 'react';
import {connect} from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {changeCenter} from '../../Store/actions.js'
import MapsPlace from 'material-ui/svg-icons/maps/place';


class TouristAttractionItem extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleCenterChange = (lat,lng) => () => {
    this.props.dispatch(changeCenter(lat,lng));
    console.log(this.props.info)
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render(){
    const {route} = this.props
    return (
  <div>
    <CardText>
            <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label="View more."
            />
    </CardText>
    {Object.values(route).map(e => 
      <Card key = {e.id} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          onClick = {this.handleCenterChange(e.latitude,e.longitude)}
          style = {{cursor:'pointer'}}
          showExpandableButton={true}
        >
            <FlatButton style={{paddingBottom:'0px', display:'flex', alignItems:'center'}}label={e.name}><MapsPlace style={{marginTop:'7px'}} /></FlatButton>
        </CardHeader>
        <CardText expandable={true}>
            {e.description}
        </CardText>
      </Card>)}
  </div>

)}}

export default connect()(TouristAttractionItem);



