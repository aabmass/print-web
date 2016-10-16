import React, { Component } from 'react';

const initialState = {
  username: '',
  password: ''
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    // set up event handlers
    this.handleUsername = this.handleInputEvent.bind(this, "username");
    this.handlePassword = this.handleInputEvent.bind(this, "password");
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputEvent(stateName, event) {
    let newState = {};
    newState[stateName] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    let {username, password} = this.state;

    // call the callback passed in from above in the higher components
    this.props.handleLogin(username, password);
  }

  render() {
    return (
      <div className="LoginForm">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleUsername}
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePassword}
          />
          <input type="submit" value="Login"/>
        </form>
        <p>{this.props.isLoggedIn ? 'YAY Logged In!' : ''}</p>
      </div>
    );
  }
}

export default LoginForm;
