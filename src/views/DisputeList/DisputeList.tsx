import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page } from '../../components'
import { Header, Filter, Results } from './components';
import Error401 from '../Error401'
import { observer, inject } from 'mobx-react';
const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  header: {
    marginBottom: theme.spacing(3)
  },
  filter: {
    marginTop: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(6)
  }
}));

const DisputeList = inject('rootStore')(observer(({ rootStore }) => {
  const classes = useStyles(1);
  if (rootStore.user.isUserLogin) {
    return (
      <Page
        className={classes.root}
        title="Disputes"
      >
        <Header className={classes.header} rootStore={rootStore} />
        <Filter className={classes.filter} rootStore={rootStore}/>
        <Results className={classes.results} />
      </Page>
    );
  } else {
    return (
      <Error401 />
    )
  }
}));

export default DisputeList;
