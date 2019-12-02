import React, { useState, useRef, useEffect } from 'react';
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
import Error401 from '../../../Error401'

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
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

function compareNumeric(a, b) {
  if (Number(a.createTime) > Number(b.createTime)) return -1;
  if (Number(a.createTime) == Number(b.createTime)) return 0;
  if (Number(a.createTime) < Number(b.createTime)) return 1;
}

function definePriceHigh(a, b) {
  if (Number(a.price) > Number(b.price)) return -1;
  if (Number(a.price) == Number(b.price)) return 0;
  if (Number(a.price) < Number(b.price)) return 1;
}

function definePriceLow(a, b) {
  if (a.price > b.price) return 1;
  if (a.price == b.price) return 0;
  if (a.price < b.price) return -1;
}

const ProjectsContainer = observer((props) => {
  const { className, rootStore, ...rest } = props;

  const classes = useStyles(1);
  const sortRef = useRef(null);
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Default');
  const [mode, setMode] = useState('grid');
  const [offset, setOffset] = useState(0)
  const handleSortOpen = () => {
    setOpenSort(true);
  };

  const handleSortClose = () => {
    setOpenSort(false);
  };

  const handleSortSelect = value => {
    setSelectedSort(value);
    setOpenSort(false);

    if (value == "Most recent") {
      let tasks = rootStore.tasks.getFilteredTasks.sort(compareNumeric)
      rootStore.tasks.setFilteredTasks(tasks)
    } else if (value == "Price high") {
      let tasks = rootStore.tasks.getFilteredTasks.sort(definePriceHigh)
      rootStore.tasks.setFilteredTasks(tasks)
    } else if (value == "Price low") {
      let tasks = rootStore.tasks.getFilteredTasks.sort(definePriceLow)
      rootStore.tasks.setFilteredTasks(tasks)
    }
  };

  const handleModeChange = (event, value) => {
    setMode(value);
  };

  useEffect(() => {
    
  }, []);
  const handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 9);

    setOffset(offset)
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
          Showing {rootStore.tasks.getFilteredTasks ? rootStore.tasks.getFilteredTasks.slice(offset, offset+9).length : 0} tasks
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
      <ProjectsGrig classes={classes} mode={mode} projects={rootStore.tasks.getFilteredTasks.slice(offset, offset+9)} rootStore={rootStore}/>
      <div className={classes.paginate}>
        <Paginate pageCount={Math.ceil(rootStore.tasks.getFilteredTasks.length/9) || 1} onPageChange={handlePageClick}/>
      </div>
      <Menu
        anchorEl={sortRef.current}
        onClose={handleSortClose}
        open={openSort}
      >
        {['Most recent', 'Price high', 'Price low'].map(
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
        <Error401 />
      )
    }
  }
}

export default Projects;
