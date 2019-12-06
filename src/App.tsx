import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import routes from './Routes';
import './assets/scss/index.scss';
import { renderRoutes } from 'react-router-config';
import { Provider, observer, inject } from 'mobx-react';
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
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
          <ScrollReset />
            {renderRoutes(routes)}
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}