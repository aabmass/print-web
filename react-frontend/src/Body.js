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

  render() {
    let feedEvents = this.state.recentPrints.map((p, index) => (
      <Feed.Event key={index}>
        <Feed.Label>
          <Image src={avatar} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{this.props.user.username}</Feed.User> printed on
            <Feed.Date>{p.last_printed}</Feed.Date>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    ));

    return (
      <Feed>
        {feedEvents}
      </Feed>
    )
  }
}

export default Body;
