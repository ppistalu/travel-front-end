import {GridList} from 'material-ui/GridList';
import React from 'react';
import MediaQuery from 'react-responsive';
import HomeMapItem from '../../Containers/HomeMapItem'

const styles = {
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    width: '1000px',
    margin: '40px auto',
  },
   gridListMobilePortrait: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    width: '350px',
    margin: '40px auto',
    marginBottom:'0px'
  },
};

const RouteImages = (props) => (
  <div>
    <MediaQuery minDeviceWidth={1224}>
      <MediaQuery query='(min-width: 1224px)'>
        <GridList style = {styles.gridList} cols={2.2}>
            {props.routes.map(e => 
      			<HomeMapItem route ={e} key={e.id}/>
	      	)}
      	</GridList>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 824px)'>
      <MediaQuery query='(orientation: portrait)'>
        <GridList style = {styles.gridListMobilePortrait} cols={2.2}>
            {props.routes.map(e => 
      			<HomeMapItem route ={e} key={e.id}/>
	      	)}
      	</GridList>
      </MediaQuery>
      <MediaQuery query='(orientation: landscape)'>
        <p style = {styles.paragrapOneMobile}>Please select your destination...</p>
      </MediaQuery>
    </MediaQuery>
  </div>
);

export default RouteImages;



