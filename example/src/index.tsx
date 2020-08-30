import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider, rootStore } from './stores';

ReactDOM.render(
  <Provider value={rootStore}>
    <App />
  </Provider>,
document.getElementById('root'));
