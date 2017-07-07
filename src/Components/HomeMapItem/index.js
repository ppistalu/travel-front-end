import React, { Component } from 'react';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import './index.css';


class HomeMapItem extends Component {
  render() {
    const {name} = this.props.route;
    const {photo} = this.props.route;
    const {id} = this.props.route;
    // console.log(name);
    // console.log(photo);
    // console.log(id);
    return (
        <GridTile style = {{marginLeft:"20px"}} 
          key={id}
          title={name}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={photo} alt=''/>
        </GridTile>
    );
  }
}

export default HomeMapItem;



const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};
