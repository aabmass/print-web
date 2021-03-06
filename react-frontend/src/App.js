import React, { Component } from 'react';
import './App.css';

import { Container, Grid } from 'semantic-ui-react'
import LoginPanel from './LoginPanel';
import Body from './Body';

import * as auth from './auth';
import ajaxFetch from './ajax';

class App extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      user: {
        isLoggedIn: false
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
    return { user: auth.user };
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
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <LoginPanel
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                user={this.state.user}
              />
            </Grid.Column>
            {/* May put another Column here. Right now it's just cut in half */}
          </Grid.Row>
        </Grid>

        {this.state.user.isLoggedIn ? <Body user={this.state.user} /> : null}
      </Container>
    );
  }
}

export default App;
