import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import { ProjectCard } from '../../../../components';

const useStyles = makeStyles(() => ({
  root: {}
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

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
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
});

export default Tasks;
