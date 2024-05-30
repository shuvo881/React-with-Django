import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CreateRoomPage from './CreateRoomPage';
import HomePage from './HomePage';




export default class App extends Component {
  render() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

