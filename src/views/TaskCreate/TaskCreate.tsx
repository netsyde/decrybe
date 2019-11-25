import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Page } from '../../components'
import { observer, inject } from 'mobx-react';
import * as dAppInt from '../../modules/dAppInt'
import {
  Header,
  AboutTask,
} from './components';
import Error401 from '../Error401'
const uuid = require('uuid/v4');
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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

  const handleSubmit = event => {
    event.preventDefault();
    let store = rootStore.taskCreate;
    if (len(store.getTitle) && store.getPrice > 0 && store.getCategory && 
        len(store.getBriefDescription) && len(store.getTags) &&
        len(store.getDescription) && store.getCurrency &&
        len(store.getStatus) && store.getEndDate) {
          console.log(`title: ${len(store.getTitle)}; price: ${store.getPrice}; category: ${store.getCategory}
      endDate: ${store.getEndDate}; brief: ${len(store.getBriefDescription)}; tags: ${len(store.getTags)}; desc: ${len(store.getDescription)};
      currency: ${len(store.getCurrency)}; author: ${len(store.getAuthor)}; status: ${len(store.getStatus)}`)
      createTask()
    } else {
      console.log(`title: ${len(store.getTitle)}; price: ${store.getPrice}; category: ${store.getCategory}
      endDate: ${store.getEndDate}; brief: ${len(store.getBriefDescription)}; tags: ${len(store.getTags)}; desc: ${len(store.getDescription)};
      currency: ${len(store.getCurrency)}; author: ${len(store.getAuthor)}; status: ${len(store.getStatus)}`)
      
    }
  
  };

  const createTask = async () => {
      let store = rootStore.taskCreate;
      console.log(`${store.getTitle}\n${store.getPrice}\n${store.getCategory}`)
      console.log(`${store.getEndDate}\n${store.getBriefDescription}\n${store.getTags}`)
      console.log(`${store.getDescription}\n${store.getCurrency}\n${store.getAuthor}\n${store.getStatus}`)
      /* if (len(store.getTitle) && store.getPrice > 0 && len(store.getCategory) && 
        len(store.getEndDate) && len(store.getBriefDescription) && len(store.getTags) &&
        len(store.getDescription) && len(store.getCurrency) && len(store.getAuthor) &&
        len(store.getStatus)) { */
          let now = Date.now()
          let expiration = store.getEndDate - now
          let taskId = uuid()
          let data = {
            title: store.getTitle,
            createTime: now,
            expireTime: store.getEndDate,
            price: store.getPrice,
            currency: store.getCurrency,
            author: rootStore.user.getUserAddress,
            brief: store.getBriefDescription,
            uuid: taskId,
            tags: store.getTags,
            updatedAt: now,
            members: store.getMembers,
            freelancers: store.getFreelancers,
            status: store.getStatus,
            description: store.getDescription,
            category: store.getCategory
          }
          let tx = await dAppInt.createTask(taskId, expiration, data, rootStore.user.getWavesKeeper)
          
          if (tx) {
            data.author = {
              address: rootStore.user.getUserAddress,
              avatar: rootStore.user.getUserAvatar,
              name: rootStore.user.getUserName,
            }
            rootStore.tasks.addTask(data)
          }
  }
  if (rootStore.user.isUserLogin && rootStore.user.isUserReg) {
    return (
      <Page
        className={classes.root}
        title="Create Task"
      >

        <Header />
        <ValidatorForm onSubmit={handleSubmit} onError={errors => console.log(errors)}>
          <AboutTask className={classes.aboutProject} rootStore={rootStore}/>
          <div className={classes.actions}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
            >
              Create task
            </Button>
          </div>
        </ValidatorForm>
      </Page>
    );
  } else {
    return (
      <Error401 />
    )
  }
}));

export default TaskCreate;
