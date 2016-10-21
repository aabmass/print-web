import React, { Component } from 'react';
import { Feed, Image, Grid } from 'semantic-ui-react'
import PrintJobForm from './PrintJobForm';
import ajaxFetch from './ajax';
import avatar from './img/elliot.jpg';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prints: []
    }
  }

  loadData() {
    ajaxFetch('/api/prints').then(response => response.json()).then(json => {
      this.setState({ prints: json });
    });
  }

  componentDidMount() {
    this.loadData();
  }

  /* given the print object from the backend, renders how to view the file
   * uploaded for the given print job. It displays the file as an image if it
   * has the right extension, or gives a link to download the file
   */
  renderUploadFile(print) {
    let fileName = print.file_uploaded.split('/').pop();
    let fileExt = /(?:\.([^.]+))?$/.exec(print.file_uploaded)[1].toLowerCase();

    let fileIsImage = fileExt === 'png' || fileExt === 'jpg' ||
                      fileExt === 'jpeg' || fileExt === 'gif';

    return fileIsImage ? (
      <Feed.Extra images>
        <Image
          src={print.file_uploaded} href={print.file_uploaded}
          shape="rounded" bordered target="_blank"
        />
      </Feed.Extra>
    ) : (
      <Feed.Extra>
        <a href={print.file_uploaded} target="_blank">{fileName}</a>
      </Feed.Extra>
    );
  }

  render() {
    let feedEvents = this.state.prints.map((print, index) => {
      return (
        <Feed.Event key={index}>
          <Feed.Label image={avatar} />
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{this.props.user.username}</Feed.User> printed on
              <Feed.Date>{print.last_printed}</Feed.Date>
            </Feed.Summary>
            {/* renders a Feed.Extra */}
            {this.renderUploadFile(print)}
          </Feed.Content>
        </Feed.Event>
      );
    });

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Feed size="large">
              {feedEvents}
            </Feed>
          </Grid.Column>

          <Grid.Column>
            <PrintJobForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Body;
