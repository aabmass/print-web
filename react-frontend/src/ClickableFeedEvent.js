import React from 'react';
import { Feed } from 'semantic-ui-react';
import './ClickableFeedEvent.css'

/**
 * Wraps up a semantic-ui-react Feed.Event and simply imports some css to
 * to make it look more clickable e.g. hover UI queues
 *
 */
const ClickableFeedEvent = ({enabled = true, ...props}) => (
  <Feed.Event
    {...props}
    className={(enabled ? 'clickEnabled' : 'clickDisabled') + ' ' + (props.className || '')}
  />
);

export default ClickableFeedEvent;
