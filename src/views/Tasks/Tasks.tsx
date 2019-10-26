import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { TaskCard } from './components';
import { observer, inject } from 'mobx-react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    padding: theme.spacing(5),
  },
  task: {
    display: "flex",
  	justifyContent: "center",
    marginBottom: 20
  }
}))

const Tasks = inject('userStore')(observer(({ userStore }) => {
  const classes = useStyles(1);
  let cards = []
  if (userStore.isUserLogin) {
    for(let i = 0; i < userStore.getAllTasksLength; i++) {
      let card = (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <TaskCard
            price={userStore.getTaskPrice(i) ? userStore.getTaskPrice(i) : "NaN"}
            name={userStore.getTaskTitle(i) ? userStore.getTaskTitle(i) : "Undefined"}
            image={userStore.getTaskImage(i) ? userStore.getTaskImage(i) : `https://picsum.photos/${i}/354`}
            features={userStore.getTaskDescription(i) ? userStore.getTaskDescription(i) : "Undefined"}
          />
        </Grid>  
      )
      cards.push(card)
    }
    return (
      <div className={classes.content}>
        <Grid container direction="row" className={classes.container}>          
          {cards}
        </Grid>
      </div>
    )
  } else {
    return (
      <p>Login please</p>
    )
  }
}))

export default Tasks;