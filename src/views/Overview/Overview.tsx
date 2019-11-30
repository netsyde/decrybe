import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { Page } from '../../components';
import {
  Header,
  Statistics,
} from './components';
import Error401 from '../Error401'

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  statistics: {
    marginTop: theme.spacing(3)
  },
  notifications: {
    marginTop: theme.spacing(6)
  },
  projects: {
    marginTop: theme.spacing(6)
  },
  todos: {
    marginTop: theme.spacing(6)
  }
}));

const Overview = inject('rootStore')(observer(({ rootStore }) => {
  const classes = useStyles(1);

  if (rootStore.user.isUserLogin && rootStore.user.isUserReg) {
    return (
      <Page
        className={classes.root}
        title="Overview"
      >
        <Header rootStore={rootStore}/>
        <Statistics className={classes.statistics} rootStore={rootStore}/>
      </Page>
    );
  } else {
    return (
      <Error401 />
    )
  }
}));

export default Overview;
