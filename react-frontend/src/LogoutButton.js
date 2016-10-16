import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class LogoutButton extends Component {
  render() {
    return (
      <Button primary onClick={this.props.handleLogout}>Logout</Button>
    );
  }
}

export default LogoutButton;
