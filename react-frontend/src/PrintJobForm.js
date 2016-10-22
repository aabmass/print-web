import React, { Component } from 'react';
import { Form, Button, Icon, Message } from 'semantic-ui-react'
import { multipartFetch } from './ajax';

class PrintJobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileChosen: null,
      errors: [],
      isUploading: false
    };
  }

  onSubmit = (event, serializedData) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    let newState = this.state;
    newState.isUploading = true;
    this.setState(newState);

    // post the form to the db
    multipartFetch('api/prints', {
      method: 'POST',
      body: formData
    }, false)

      .then(res => res.json())

      .then(print => {
        this.props.onPrintCreate(print);
        this.setState({
          fileChosen: null,
          errors: [],
          isUploading: false
        });
        return print;
      })

      .catch(error => {
        return error.response.json().then(json => {
          let errors = [].concat(json.non_field_errors || [])
            .concat(json.file_uploaded || []);
          this.setState({
            fileChosen: null,
            errors,
            isUploading: false
          });
        });
      });
  }

  triggerFileInput = (event) => {
    event.preventDefault();

    // trigger a click on the hidden file dialog
    this.refs.fileInput.click();
  }

  openFileDialog = (event) => {
    // let default action occur, but don't bubble event back up!
    event.stopPropagation();
  }

  userChoseFile = event => {
    this.setState({ fileChosen: event.target.files[0].name });
  }

  render() {
    return (
      <Form error={this.state.errors.length > 0} onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Choose a File</label>
          { /* unfortunately, this triggers the form tosubmit and the button
            click. See event handler */ }
          <Button basic color="violet" loading={this.state.isUploading}
            onClick={this.triggerFileInput}>

            <Icon name="file" />
            <input type="file" ref="fileInput" style={{display: 'none'}}
              name="file_uploaded" onClick={this.openFileDialog}
              onChange={this.userChoseFile} />
            {this.state.fileChosen || "Upload a File"}
          </Button>
        </Form.Field>
        <Form.Button primary disabled={this.state.isUploading}>Submit</Form.Button>

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

export default PrintJobForm;
