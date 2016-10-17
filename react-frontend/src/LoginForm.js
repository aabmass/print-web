import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

const initialState = {
  username: '',
  password: ''
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    // set up event handlers
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, serializedForm) {
    event.preventDefault();

    let {username, password} = serializedForm;
    this.props.handleLogin(username, password);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input icon="user" label="Username" name="username" type="text" />
        <Form.Input icon="lock" label="Password" name="password" type="password" />
        <Button primary type='submit'>Login</Button>
      </Form>
    );
  }
}

export default LoginForm;
