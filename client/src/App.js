import React, { Component } from 'react';
import SemDemo from './components/DemoApp';
import './stylesheets/universal.css';


class App extends Component {
  render() {
    return (
      <div className="component">
        <SemDemo />
      </div>
    );
  }
}

export default App;
