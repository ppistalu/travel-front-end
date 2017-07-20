import React from 'react';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import './index.css'

const HomeMapItemComponent = (props) => (
        <GridTile 
          style = {{marginLeft:"5px",marginRight:"3px", cursor:'pointer', maxWidth:"500px"}} 
          key={props.id} 
          onClick={props.handleClick}
          title={props.name}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" />
          </IconButton>}
          className = "titleStyle"
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={props.photo} alt=''/>
        </GridTile>

);

export default HomeMapItemComponent;
