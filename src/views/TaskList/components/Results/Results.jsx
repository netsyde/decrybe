import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { ProjectCard, Paginate } from '../../../../components';
import { observer, inject } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  sortButton: {
    textTransform: 'none',
    letterSpacing: 0,
    marginRight: theme.spacing(2)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));
function getRandomArbitary(min, max) {
  let rand = Math.random() * (max - min) + min;
  return rand.toFixed(0)
}

const ProjectsGrig = (props) => {
  const { rootStore, mode, classes, projects, ...rest } = props;
  if (rootStore.tasks.getTasks) {
    return (
      <Grid
      container
      spacing={3}
      >
        {projects.map(project => (
          <Grid
            item
            key={project ? project.uuid : getRandomArbitary(100, 666)}
            md={mode === 'grid' ? 4 : 12}
            sm={mode === 'grid' ? 6 : 12}
            xs={12}
          >
            <ProjectCard project={project ? project : ""} rootStore={rootStore} />
          </Grid>
        ))}
      </Grid>
    )
  } else {
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    )
  }
}
const ProjectsContainer = observer((props) => {
  const { className, rootStore, ...rest } = props;

  const classes = useStyles(1);
  const sortRef = useRef(null);
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Most popular');
  const [mode, setMode] = useState('grid');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
/*
    let loadTasks = async () => {
      console.log(`${rootStore.user.isUserLogin} ${rootStore.user.getDapp} ${rootStore.user.getUserNetwork}`)
      if (rootStore.tasks.getTasks) {
        setProjects(rootStore.tasks.getTasks);
      }
    }

    loadTasks()
    */
  }, []);

  const handleSortOpen = () => {
    setOpenSort(true);
  };

  const handleSortClose = () => {
    setOpenSort(false);
  };

  const handleSortSelect = value => {
    setSelectedSort(value);
    setOpenSort(false);
  };

  const handleModeChange = (event, value) => {
    setMode(value);
  };

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
          Showing {projects.length} tasks
        </Typography>
        <div className={classes.actions}>
          <Button
            className={classes.sortButton}
            onClick={handleSortOpen}
            ref={sortRef}
          >
            {selectedSort}
            <ArrowDropDownIcon />
          </Button>
          <ToggleButtonGroup
            exclusive
            onChange={handleModeChange}
            size="small"
            value={mode}
          >
            <ToggleButton value="grid">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <ProjectsGrig classes={classes} mode={mode} projects={rootStore.tasks.getTasks} rootStore={rootStore}/>
      <div className={classes.paginate}>
        <Paginate pageCount={3} />
      </div>
      <Menu
        anchorEl={sortRef.current}
        onClose={handleSortClose}
        open={openSort}
      >
        {['Most recent', 'Popular', 'Price high', 'Price low', 'On sale'].map(
          option => (
            <MenuItem
              key={option}
              onClick={() => handleSortSelect(option)}
            >
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
});

@inject("rootStore")
@observer
class Projects extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.rootStore.user.isUserLogin) {
      return (
        <ProjectsContainer rootStore={this.props.rootStore} />
      )
    } else {
      return (
        <p>Please Log In</p>
      )
    }
  }
}

export default Projects;
