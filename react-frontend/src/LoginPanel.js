import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';

// a react function component
class LoginPanel extends Component {
  render() {
    let body = undefined;

    if (this.props.isLoggedIn) {
      let { username, email } = this.props.user;
      body = (
        <Card>
          <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{email}</Card.Meta>
          </Card.Content>
          <LogoutButton
            handleLogout={this.props.handleLogout}
          />
        </Card>
      );
    }
    else {
      body = (
        <LoginForm
          handleLogin={this.props.handleLogin}
          isLoggedIn={this.props.isLoggedIn}
        />
      );
    }

    return body;
  }
}

export default LoginPanel;
