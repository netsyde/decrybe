import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/core/styles';
// import light from './theme/light';
// import dark from './theme/dark'
import routes from './Routes';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'mobx-react';
import rootStore from './store/RootStore'
const stores = { rootStore };
const browserHistory = createBrowserHistory();

import {
  ScrollReset,
} from './components';

export default class App extends Component {
  
  render() {
    
    return (
      <Provider { ...stores }>
          <Router history={browserHistory}>
          <ScrollReset />
            {renderRoutes(routes)}
          </Router>
      </Provider>
    );
  }
}