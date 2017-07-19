import React from 'react';
import MediaQuery from 'react-responsive';

const styles = {
  paragraphOne: {
    fontSize:'35px', 
    fontWeight:'bold', 
    fontFamily:'sans-serif', 
    textAlign:'center', 
    marginTop:'120px'
  },
  paragrapOneMobile: {
    fontSize:'25px', 
    fontWeight:'bold', 
    fontFamily:'sans-serif', 
    textAlign:'center', 
    marginTop:'30px',
    marginBottom:'0px'
  },
};

const ParagraphOneHome = (props) => (
  <div>
    <MediaQuery minDeviceWidth={1224}>
      <MediaQuery query='(min-width: 1224px)'>
        <p style = {styles.paragraphOne}>Please select your destination...</p>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 1224px)'>
        <p style = {styles.paragrapOneMobile}>Please select your destination...</p>
    </MediaQuery>
  </div>
);

export default ParagraphOneHome;


        