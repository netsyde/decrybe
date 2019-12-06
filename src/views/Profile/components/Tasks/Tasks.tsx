import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import { ProjectCard } from '../../../../components';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inner: {
    textAlign: 'center'
  },
  image: {
    maxWidth: 400
  },
  title: {
    margin: theme.spacing(4, 0, 1, 0)
  }
}));

const Tasks = observer((props) => {
  const { className, rootStore, id, ...rest } = props;
  const [tasks, setTasks] = useState([]);
  const classes = useStyles(1);

  useEffect(() => {
    async function getTask () {
      
      let data = await rootStore.users.getTasks(id)
      if (data) {
        
        setTasks(data);
      } else {
        console.log('Tasks Load load error')
      }
    }
    if (rootStore.user.isLogin) {
      getTask()
    }
  }, []);
  if (tasks.length > 0) {
    return (
      <div
        {...rest}
        className={clsx(className)}
      >
        <Grid
          container
          spacing={3}
        >
          {tasks.map(task => (
            <Grid
              item
              key={task.uuid}
              lg={4}
              md={6}
              xs={12}
            >
              <ProjectCard project={task} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  } else {
    return (
      <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.inner}>
        <img
          alt="Еhere's nothing here yet"
          className={classes.image}
          src="/img/undraw_work_chat_erdt.svg"
        />
        <Typography
          className={classes.title}
          variant="h4"
        >
          There's nothing here yet
        </Typography>
        <Typography variant="subtitle1">
          The user has no tasks
        </Typography>
      </div>
    </div>
    )
  }
});

export default Tasks;
