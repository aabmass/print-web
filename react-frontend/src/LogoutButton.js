import React, { Component } from 'react';

class LogoutButton extends Component {
  render() {
    return (
      <button onClick={this.props.handleLogout}>Logout</button>
    );
  }
}

export default LogoutButton;
