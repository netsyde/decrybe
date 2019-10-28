import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
const app = document.getElementById('app');
if (app) {
  ReactDOM.render(<App />, app);
}
serviceWorker.unregister();