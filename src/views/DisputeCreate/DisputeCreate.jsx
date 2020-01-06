import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Page } from '../../components'
import { observer, inject } from 'mobx-react';
import * as dAppInt from '../../modules/dAppInt'
import * as nodeInt from '../../modules/nodeInt'
import {
  Header,
  AboutDispute,
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

const DisputeCreate = inject('rootStore')(observer(({ rootStore }) => {
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

  const [disputeCreated, setDisputeCreated] = useState(false);
  const [dispute, setDispute] = useState('');
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
    let store = rootStore.disputeCreate;
    if (len(store.getTitle) &&
        len(store.getBriefDescription) &&
        len(store.getDescription) && len(store.getTask)) {

        createDispute()
    } else {
      createSnackbar('info', 'You have not filled in all the fields')
    }
  
  };

  let validatorListener = async () => {
    const valid = await formRef.current.isFormValid();
    setValid(valid)
  }

  const createDispute = async () => {
    let store = rootStore.disputeCreate;
    let data = {
      title: store.getTitle,
      brief: store.getBriefDescription,
      message: store.getDescription,
      createdAt: Date.now()
    }
    let tx = await dAppInt.openTaskDispute(store.getTask, data, rootStore.user.getWavesKeeper)
       
    if (tx) {
      createSnackbar('success', 'Dispute successfully created!')
      await rootStore.user.updateStorage()
      setDispute(store.getTask)
      setDisputeCreated(true)
      rootStore.disputeCreate.clean();
            
    } else {
      createSnackbar('error', 'Error: transaction is rejected')
    }
  }

  if (disputeCreated) {
    return <Redirect to={`/disputes/${dispute}/overview`} />
  }

  if (rootStore.user.isUserLogin && rootStore.user.isUserReg) {
    if (rootStore.user.getUserAttachedTasks.length > 0) {
    return (
      <Page
        className={classes.root}
        title="Create Dispute"
      >

        <Header />
        <ValidatorForm onSubmit={handleSubmit} onError={errors => console.log(errors)}
          ref={formRef}
        >
          <AboutDispute className={classes.aboutProject} rootStore={rootStore} validatorListener={validatorListener}/>
          <div className={classes.actions}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!isValid}
            >
              Create dispute
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
        <p>NOPE</p>
      )
    }
  } else {
    return (
      <Error401 />
    )
  }
}));

export default DisputeCreate;
