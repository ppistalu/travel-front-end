import React from 'react';
import MediaQuery from 'react-responsive';

const styles = {
  paragraphTwo: {
    textAlign:'center', 
    marginTop:"120px"
  },
  paragrapTwoMobilePortait: {
    textAlign:'center', 
    marginTop:"40px",
    marginLeft:'30px',
    marginRight:'20px',
    marginBottom:'0px'
  },
  paragrapTwoMobile: {
    textAlign:'center', 
    marginTop:"10px",
  },
};

const ParagraphTwoHome = (props) => (
  <div>
    <MediaQuery minDeviceWidth={1224}>
      <MediaQuery query='(min-width: 1224px)'>
        <p style = {styles.paragraphTwo}>Or let yourself inspired by our most popular routes:</p>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 824px)'>
      <MediaQuery query='(orientation: portrait)'>
        <p style = {styles.paragrapTwoMobilePortait}>Or let yourself inspired by our most popular routes:</p>
      </MediaQuery>
      <MediaQuery query='(orientation: landscape)'>
        <p style = {styles.paragrapTwoMobile}>Or let yourself inspired by our most popular routes:</p>
      </MediaQuery>
    </MediaQuery>
  </div>
);

export default ParagraphTwoHome;


        