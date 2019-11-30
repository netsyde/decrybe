import React, { useState, forwardRef } from 'react';
import { Link as RouterLink, BrowserRouter } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Button from '@material-ui/core/Button';

import { Login } from './components'
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  logo: {
    //paddingLeft: 21,
    width: 150,
    display: "flex"
  },
  logoLink: {
    /*
    width: 256,
    display: 'flex',
    justifyContent: "center"
    */
  }
  
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
  >
      <RouterLink {...props} />
  </div>
));

const Topbar = props => {
  const { className, onOpenNavBarMobile, ...rest } = props;

  const classes = useStyles(1);

  const [notifications] = useState([]);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <BrowserRouter>
          <RouterLink className={classes.logoLink} to="/">
            <img
              alt="Logo"
              src="/img/decrybe.png"
              className={classes.logo}
            />
          </RouterLink>
        </BrowserRouter>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <Button
            variant="contained"
            color="primary"
            component={CustomRouterLink}
            to="/tasks/create"
          >
            Create Task
          </Button>
          <Login />
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;