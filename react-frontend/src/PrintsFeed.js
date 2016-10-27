import React, { Component } from 'react';
import { Card, Feed, Image } from 'semantic-ui-react'

import avatar from './img/elliot.jpg';
import { isImageFile, computeFileName } from './utils';
import ClickableFeedEvent from './ClickableFeedEvent'

class PrintsFeed extends Component {
  /* given the print object from the backend, renders how to view the file
   * uploaded for the given print job. It displays the file as an image if it
   * has the right extension, or gives a link to download the file
   */
  renderUploadFile(print) {
    const path = print.file_uploaded;
    let fileName = computeFileName(path);

    return isImageFile(path) ? (
      <Feed.Extra images>
        <Image
          src={path} href={path}
          shape="rounded" bordered target="_blank"
        />
      </Feed.Extra>
    ) : (
      <Feed.Extra>
        <a href={path} target="_blank">{fileName}</a>
      </Feed.Extra>
    );
  }

  renderFeedEvents() {
    const onClickPrintJob = (index) => () => this.props.onChooseSelectedJob(index);

    return this.props.prints.map((print, index) => {
      return (
        <ClickableFeedEvent key={index} onClick={onClickPrintJob(index)}>
          <Feed.Label image={avatar} />
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{this.props.user.username}</Feed.User> printed on
              <Feed.Date>{print.last_printed}</Feed.Date>
            </Feed.Summary>
            {/* renders a Feed.Extra */}
            {this.renderUploadFile(print)}
          </Feed.Content>
        </ClickableFeedEvent>
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
