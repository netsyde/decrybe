import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Page } from '../../components'
import { observer, inject } from 'mobx-react';
import * as dAppInt from '../../modules/dAppInt'
import * as nodeInt from '../../modules/nodeInt'
import {
  Header,
  AboutTask,
} from './components';
import Error401 from '../Error401'
const uuid = require('uuid/v4');
import { ValidatorForm } from 'react-material-ui-form-validator';
import { CustomSnackbar } from '../../components'
import { Redirect } from 'react-router-dom';

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

  const len = (arg) => {
    if (arg.length > 0) {
      return true
    } else {
      return false
    }
  }

  let formRef = React.createRef();
  const [isValid, setValid] = React.useState(false);

  const [taskCreated, setTaskCreated] = useState(false);
  const [task, setTask] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("")
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const createSnackbar = (type, message) => {
    setSnackbarMessage(message)
    setSnackbarType(type)
    setOpenSnackbar(true);
  }

  const handleSubmit = event => {
    event.preventDefault();
    let store = rootStore.taskCreate;
    if (len(store.getTitle) && store.getPrice > 0 && store.getCategory && 
        len(store.getBriefDescription) && len(store.getTags) &&
        len(store.getDescription) && store.getCurrency &&
        len(store.getStatus) && store.getEndDate) {

      createTask()
    } else {
      createSnackbar('info', 'You have not filled in all the fields')
    }
  
  };

  let validatorListener = async () => {
    const valid = await formRef.current.isFormValid();
    setValid(valid)
  }

  const createTask = async () => {
    let store = rootStore.taskCreate;
    let now = Date.now()
    let expiration = nodeInt.dateToHeight(store.getEndDate)
    let taskId = uuid()
    let data = {
      title: store.getTitle,
      createTime: now,
      expireTime: store.getEndDate,
      currency: store.getCurrency,
      brief: store.getBriefDescription,
      uuid: taskId,
      tags: store.getTags,
      updatedAt: now,
      description: store.getDescription,
      category: store.getCategory
    }
    let tx = await dAppInt.createTask(taskId, expiration, data, store.getPrice, rootStore.user.getWavesKeeper)
       
    if (tx) {
      createSnackbar('success', 'Task successfully created!')
      rootStore.taskCreate.clean();
      await rootStore.user.updateStorage()
      setTask(taskId)
      setTaskCreated(true)
            
    } else {
      createSnackbar('error', 'Error: transaction is rejected')
    }
  }

  if (taskCreated) {
    return <Redirect to={`/tasks/${task}/overview`} />
  }

  if (rootStore.user.isUserLogin && rootStore.user.isUserReg) {
    return (
      <Page
        className={classes.root}
        title="Create Task"
      >

        <Header />
        <ValidatorForm onSubmit={handleSubmit} onError={errors => console.log(errors)}
          ref={formRef}
        >
          <AboutTask className={classes.aboutProject} rootStore={rootStore} validatorListener={validatorListener}/>
          <div className={classes.actions}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!isValid}
            >
              Create task
            </Button>
          </div>
        </ValidatorForm>
        <CustomSnackbar
          onClose={handleSnackbarClose}
          open={openSnackbar}
          message={snackbarMessage}
          type={snackbarType}
        />
      </Page>
    );
  } else {
    return (
      <Error401 />
    )
  }
}));

export default TaskCreate;
