import React from 'react';
import Responsive from 'react-responsive';
 
// Default (desktop, tablet) and mobile setup 
const Default = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;

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
    <Default><p style = {styles.paragraphOne}>Please select your destination...</p></Default>
    <Mobile><p style = {styles.paragrapOneMobile}>Please select your destination...</p></Mobile>
  </div>
);

export default ParagraphOneHome;


        