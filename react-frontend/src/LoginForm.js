import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react'

const initialState = {
  errors: []
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
    this.props.handleLogin(username, password).catch((error) => {
      return error.response.json().then(json => {
        this.setState({ errors: json.non_field_errors });
      });
    });
  }

  render() {
    return (
      <Form error={this.state.errors.length > 0} onSubmit={this.handleSubmit}>
        <Form.Input icon="user" label="Username" placeholder="Username"
          name="username" type="text" />
        <Form.Input icon="lock" label="Password" placeholder="Password"
          name="password" type="password" />
        <Button color="teal" icon="user" content="Login" type="submit"
          labelPosition="left" />

        {this.state.errors ?
          <Message
            error
            header={this.state.errors[0]}
            content={this.state.errors[0]}
          /> : null}
      </Form>

    );
  }
}

export default LoginForm;
