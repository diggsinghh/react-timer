import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import Timer from "./Timer"
function App() {
  return (
    <div className="App">
      <div className="header-class">
        <FontAwesomeIcon icon={faHourglassHalf} className="icon-class"/>
        <h1>
          React Timer
        </h1>
      </div>
      <div>
        <Timer />
      </div>
    </div>
  );
}

export default App;
