import React, { Component } from 'react';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';

// a react function component
class LoginPanel extends Component {
  render() {
    let body = undefined;

    if (this.props.isLoggedIn) {
      body = (
        <LogoutButton
          handleLogout={this.props.handleLogout}
        />
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
