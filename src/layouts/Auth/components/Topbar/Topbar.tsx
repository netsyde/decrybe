import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  logo: {
    //paddingLeft: 21,
    width: 150,
    display: "flex"
  },
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles(1);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/img/decrybe.png"
            className={classes.logo}
          />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
