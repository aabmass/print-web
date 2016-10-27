import React, { Component } from 'react';
import { Card, Feed, Image } from 'semantic-ui-react'
import avatar from './img/elliot.jpg';

class PrintsFeed extends Component {
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

  renderFeedEvents() {
    return this.props.prints.map((print, index) => {
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
  }

  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {this.props.user.username}'s Print Jobs
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed size="large">
            {this.renderFeedEvents()}
          </Feed>
        </Card.Content>
      </Card>
    );
  }
}

export default PrintsFeed;