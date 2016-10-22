import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import PrintJobForm from './PrintJobForm';
import PrintsFeed from './PrintsFeed';
import ajaxFetch from './ajax';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prints: []
    }
  }

  appendPrint = (print) => {
    // put new print at the front
    this.state.prints.unshift(print);

    this.setState({
      prints: this.state.prints
    });
  }

  loadData() {
    ajaxFetch('/api/prints').then(response => response.json()).then(json => {
      this.setState({ prints: json });
    });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <PrintsFeed prints={this.state.prints} user={this.props.user} />
          </Grid.Column>

          <Grid.Column>
            <PrintJobForm onPrintCreate={this.appendPrint} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Body;
