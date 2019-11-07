import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Page } from '../../components'
import { observer, inject } from 'mobx-react';

import {
  Header,
  AboutTask,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  aboutAuthor: {
    marginTop: theme.spacing(3)
  },
  aboutProject: {
    marginTop: theme.spacing(3)
  },
  projectCover: {
    marginTop: theme.spacing(3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  preferences: {
    marginTop: theme.spacing(3)
  },
  actions: {
    marginTop: theme.spacing(3)
  }
}));

const TaskCreate = inject('rootStore')(observer(({ rootStore }) => {
  const classes = useStyles(1);
  if (rootStore.user.isUserLogin) {
    return (
      <Page
        className={classes.root}
        title="Create Task"
      >
        <Header />
        <AboutTask className={classes.aboutProject} rootStore={rootStore}/>
        <div className={classes.actions}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {}}
          >
            Create task
          </Button>
        </div>
      </Page>
    );
  } else {
    <Page
        className={classes.root}
        title="Create Task"
      >
    <p>Please log in</p>
    </Page>
  }
}));

export default TaskCreate;
