import React, { Component } from 'react';
import { login } from './Auth.js';

class LoginForm extends Component {
  initialState = {username: "", password: ""}

  constructor(props) {
    super(props);
    // this.state = {username: "", password: ""};
    this.state = this.initialState;

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
    login(username, password);

    this.setState(this.initialState);
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
      </div>
    );
  }
}

export default LoginForm;
