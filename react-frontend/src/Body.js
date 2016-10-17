import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react'
import ajaxFetch from './ajax';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentPrints: []
    }
  }

  loadData() {
    ajaxFetch('/api/prints').then(response => response.json()).then(json => {
      this.setState({ recentPrints: json.prints });
    });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    let feedEvents = this.state.recentPrints.map(p => (
      <Feed.Event>
        <Feed.Label>
          <img src='http://semantic-ui.com/images/avatar/small/elliot.jpg' alt=""/>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>Elliot Fu</Feed.User> added you as a friend
            <Feed.Date>1 Hour Ago</Feed.Date>
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
