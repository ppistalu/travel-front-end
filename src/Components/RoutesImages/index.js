import {GridList} from 'material-ui/GridList';
import React from 'react';
import HomeMapItem from '../../Containers/HomeMapItem'
import Responsive from 'react-responsive';
 
// Default (desktop, tablet) and mobile setup 
const Default = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;

const styles = {
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    width: '970px',
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
      <Default>
        <GridList style = {styles.gridList} cols={2.2}>
            {props.routes.map(e => 
            <HomeMapItem route ={e} key={e.id}/>
          )}
        </GridList>
    </Default>
    <Mobile>
      <GridList style = {styles.gridListMobilePortrait} cols={2.2}>
            {props.routes.map(e => 
            <HomeMapItem route ={e} key={e.id}/>
          )}
        </GridList>
    </Mobile>
  </div>
);

export default RouteImages;



