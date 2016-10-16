import React, { Component } from 'react';

import { Accordion } from 'semantic-ui-react'

class Body extends Component {
  render() {
    const panels = [{
      title: 'What is a dog?',
      content: 'awdadw',
    }, {
      title: 'What kinds are there?',
      content: '...',
    },{
      title: 'What is a roo?',
      content: 'Beaken',
    }]

    return (
      <div>
        <h1>Yo yo yo!</h1>
        
        <Accordion panels={panels} />
      </div>
    )
  }
}

export default Body;
