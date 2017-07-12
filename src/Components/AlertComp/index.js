import React from 'react';
import Alert from 'react-material-alert';
import Natures from 'react-material-alert';
 
const sayTheyHitClose = () =>{
    console.log('they hit the close button captain!');
  };

 class AlertComp extends React.Component {

    render() {
        return (<div>
                <Alert 
                  alert= {{
                    nature: Natures.SUCCESS,
                    content: "it is a <strong>success</strong>!"
                  }}
                  id={"alert_1"}
                  closeCallback={sayTheyHitClose} />
            </div>)
    }
};

export default AlertComp;