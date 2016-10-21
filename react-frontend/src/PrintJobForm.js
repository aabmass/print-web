import React, { Component } from 'react';
import { Form, /* Message */ } from 'semantic-ui-react'
import { multipartFetch } from './ajax';

class PrintJobForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSubmit(event, serializedData) {
    event.preventDefault();
    let formData = new FormData(event.target);
    console.log(formData);

    // post the form to the db
    multipartFetch('api/prints', {
      method: 'POST',
      body: formData
    }, false).then(res => res.json()).then(json => {
      // give json response data to a callback to update state in root
      // component here!
    });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Choose a File</label>
          <input type="file" name="file_uploaded" />
        </Form.Field>
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default PrintJobForm;
