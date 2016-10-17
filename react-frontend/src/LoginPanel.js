import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import LoginForm from './LoginForm';

// a react function component
class LoginPanel extends Component {
  render() {
    let body = undefined;

    let isLoggedIn = this.props.user.isLoggedIn;

    if (isLoggedIn) {
      let { username, email } = this.props.user;
      body = (
        <Card>
          <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{email}</Card.Meta>
          </Card.Content>
          <Button onClick={this.props.handleLogout}>Logout</Button>
        </Card>
      );
    }
    else {
      body = (
        <LoginForm
          handleLogin={this.props.handleLogin}
          isLoggedIn={isLoggedIn}
        />
      );
    }

    return body;
  }
}

export default LoginPanel;
