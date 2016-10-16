import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import LoginPanel from './LoginPanel';

import * as auth from './auth';

class App extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      isLoggedIn: false,
      user: {
        username: ''
      }
    };

    // event handlers
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    // modify the state based on non-pure inputs here
    this.setState(this.computeAuthState());
  }

  computeAuthState() {
    let newState = this.state;
    newState.isLoggedIn = auth.isLoggedIn();
    newState.user = auth.user;

    return newState;
  }

  /* callbacks */
  handleLogin(username, password) {
    auth.login(username, password).then(() => {
      this.setState(this.computeAuthState());
    });
  }

  handleLogout() {
    auth.logout();

    this.setState(this.computeAuthState());
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. Jokes
        </p>

        <LoginPanel
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          isLoggedIn={this.state.isLoggedIn}
        />
      </div>
    );
  }
}

export default App;
