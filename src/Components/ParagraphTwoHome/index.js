import React from 'react';
import Responsive from 'react-responsive';
 
// Default (desktop, tablet) and mobile setup 
const Default = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;

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
    <Default><p style = {styles.paragraphTwo}>Or let yourself inspired by our most popular routes:</p></Default>
    <Mobile> <p style = {styles.paragrapTwoMobilePortait}>Or let yourself inspired by our most popular routes:</p></Mobile>
  </div>
);

export default ParagraphTwoHome;


        