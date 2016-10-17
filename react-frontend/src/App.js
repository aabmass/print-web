import React, { Component } from 'react';
import './App.css';

import { Container, Grid, Button } from 'semantic-ui-react'
import LoginPanel from './LoginPanel';
import Body from './Body';

import * as auth from './auth';
import ajaxFetch from './ajax';

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

    // try and restore the auth from localStorage before the first render
    auth.restoreAuth();

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
    // a promise
    return auth.login(username, password).then(() => {
      this.setState(this.computeAuthState());
    });
  }

  handleLogout() {
    auth.logout();

    this.setState(this.computeAuthState());
  }

  doAjax() {
    ajaxFetch('api/somebackendroute');
  }

  render() {
    return (
      <Container className="app">
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <LoginPanel
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                isLoggedIn={this.state.isLoggedIn}
              />
            </Grid.Column>
            <Grid.Column>
              <Button onClick={() => this.doAjax()}>Do some AJAX</Button>
            </Grid.Column>

            <Grid.Column>
              <Body />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
