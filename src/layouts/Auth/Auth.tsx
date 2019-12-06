import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { Provider } from 'mobx-react';
import { Topbar } from './components';
import rootStore from '../../store/RootStore'
const stores = { rootStore };

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
}));

const Auth = props => {
  const { route } = props;

  const classes = useStyles(1);

  return (
    <Provider { ...stores }>
      <Fragment>
        <Topbar />
        <main className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {renderRoutes(route.routes)}
          </Suspense>
        </main>
      </Fragment>
    </Provider>
  );
};

export default Auth;
