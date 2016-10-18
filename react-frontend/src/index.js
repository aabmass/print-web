import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// would love to import here... but it makes build times 10 times longer
// import 'semantic-ui-css/semantic.css';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
