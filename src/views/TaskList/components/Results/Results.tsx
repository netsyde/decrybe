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
  }
}));

const Projects = props => {
  const { className, ...rest } = props;

  const classes = useStyles(1);
  const sortRef = useRef(null);
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Most popular');
  const [mode, setMode] = useState('grid');
  const [projects, setProjects] = useState([]);

  useEffect(() => {

    const fetchProjects = () => {
      let val = [{
        title: "Test Task",
        author: {
          avatar: "https://www.nastol.com.ua/pic/201309/1920x1080/nastol.com.ua-58850.jpg",
          name: "Sgoldik"
        },
        updated_at: 1572116022788,
        tags: [{text: "decrybe", color: "#9b59b6"}, {text: "nigers", color: "#27ae60"}],
        price: 12,
        location: "Europe",
        type: "Task",
        id: 1

      }, {
        title: "Find a blockchain developer",
        author: {
          avatar: "https://www.nairaland.com/attachments/2487007_hjn_jpeg769b4e52d457ec2323c00f87b02fb417",
          name: "Stygian"
        },
        updated_at: 1572116980691,
        tags: [{text: "blockchain", color: "#c0392b"}],
        price: 120,
        location: "USA",
        type: "Task",
        id: 2

      }, {
        title: "Need a site design",
        author: {
          avatar: "https://i.pinimg.com/736x/7f/5f/6c/7f5f6ca3aa5b6dee07a156c411246d63.jpg",
          name: "Rick Sanchez"
        },
        updated_at: 1572117221448,
        tags: [{text: "Site", color: "#9b59b6"}],
        price: 50,
        location: "Russia",
        type: "Design",
        id: 3

      }]
      setProjects(val);
    };

    fetchProjects();

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
      <Grid
        container
        spacing={3}
      >
        {projects.map(project => (
          <Grid
            item
            key={project.id}
            md={mode === 'grid' ? 4 : 12}
            sm={mode === 'grid' ? 6 : 12}
            xs={12}
          >
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
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
};

export default Projects;
