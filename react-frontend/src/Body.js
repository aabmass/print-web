import React, { Component } from 'react';
import { Feed, Image } from 'semantic-ui-react'
import ajaxFetch from './ajax';
import avatar from './img/elliot.jpg';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentPrints: []
    }
  }

  loadData() {
    ajaxFetch('/api/prints').then(response => response.json()).then(json => {
      this.setState({ recentPrints: json });
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
        <Image src={print.file_uploaded} />
      </Feed.Extra>
    ) : (
      <Feed.Extra>
        <a href={print.file_uploaded} target="_blank">{fileName}</a>
      </Feed.Extra>
    );
  }

  render() {
    let feedEvents = this.state.recentPrints.map((print, index) => {
      return (
        <Feed.Event key={index}>
          <Feed.Label>
            <Image src={avatar} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{this.props.user.username}</Feed.User> printed on
              <Feed.Date>{print.last_printed}</Feed.Date>
            </Feed.Summary>
          </Feed.Content>
          {this.renderUploadFile(print)}
        </Feed.Event>
      );
    });

    return (
      <Feed>
        {feedEvents}
      </Feed>
    )
  }
}

export default Body;
