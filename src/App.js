import React, { Component } from 'react';
import './App.css';
import Map from 'google-maps-react';
import ChildMap from './ChildMap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map google = {window.google}  center={{ lat: 47.376887,lng: 8.541694}} style ={{width:'400px',height:'400px',margin:'auto'}}>
          <ChildMap/>
        </Map>
      </div>
    );
  }
}

export default App;
