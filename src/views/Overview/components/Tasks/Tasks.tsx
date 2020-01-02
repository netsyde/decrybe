import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { ProjectCard } from '../../../../components';
import { observer } from 'mobx-react';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2)
  },
  title: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  arrowIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const Projects = observer((props) => {
  const { className, rootStore, ...rest } = props;

  const classes = useStyles(props);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
      let data = await rootStore.users.getTasks(rootStore.user.getUserAddress)
      const matchesFilter = new RegExp("Completed", "i")
      data = data.filter(task => !matchesFilter.test(task.status))
      console.log(JSON.parse(data))
      setTasks(data)
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.header}>
        <Typography
          className={classes.title}
          variant="h5"
        >
          Active Projects
        </Typography>
        <Button
          component={RouterLink}
          to={`/profile/${rootStore.user.getUserAddress}/tasks`}
        >
          See all
          <KeyboardArrowRightIcon className={classes.arrowIcon} />
        </Button>
      </div>
      {tasks.map(task => (
        <ProjectCard
          key={task.uuid}
          project={task}
        />
      ))}
    </div>
  );
});

export default Projects;
