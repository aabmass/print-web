import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import objectAssign from 'object-assign';

import PrintJobForm from './PrintJobForm';
import PrintJobDetail from './PrintJobDetail';
import PrintsFeed from './PrintsFeed';
import ajaxFetch from './ajax';

const intialState = {
  prints: [],
  isPrintSelected: false,
  selectedPrint: null
};

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = objectAssign({}, intialState);
  }

  appendPrint = (print) => {
    // put new print at the front
    this.state.prints.unshift(print);

    // copy the state with Object.assign just to be safe
    this.setState(objectAssign({}, this.state));
  }

  loadData() {
    ajaxFetch('/api/prints').then(response => response.json()).then(json => {
      this.setState(objectAssign({}, this.state, { prints: json }));
    });
  }

  componentDidMount() {
    this.loadData();
  }

  onChooseSelectedJob = (index) => {
    this.setState(objectAssign({}, this.state, {
      isPrintSelected: true,
      selectedPrint: index
    }));
  }

  deleteActivePrintJob = () => {
    const printObj = this.state.prints[this.state.selectedPrint];
    const id = printObj;

    return ajaxFetch(`/api/prints/${id}`, {
      method: 'DELETE'
    }).then(response => {
      // returns a 204, don't get JSON

      // delete the old element 
      this.state.prints.splice(this.state.selectedPrint, 1);

      // set the new state
      this.setState(objectAssign({}, this.state, {
        prints: this.state.prints,

        isPrintSelected: false,
        selectedPrint: null
      }));

    });
  }

  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <PrintsFeed prints={this.state.prints} user={this.props.user}
              onChooseSelectedJob={this.onChooseSelectedJob}/>
          </Grid.Column>

          <Grid.Column>
            <PrintJobForm onPrintCreate={this.appendPrint} />
            {this.state.isPrintSelected ? 
              <PrintJobDetail
                print={this.state.prints[this.state.selectedPrint]}
                onDeletePrintJob={this.deleteActivePrintJob}
              />
            :
              null
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Body;
