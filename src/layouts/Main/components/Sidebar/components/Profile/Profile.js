import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = inject('userStore')(observer(({ userStore }) => {

  const classes = useStyles();

  const user = {
    name: userStore.getUserName ? userStore.getUserName : 'Guest',
    avatar: userStore.getUserAvatar ? userStore.getUserAvatar :'https://picsum.photos/356/354',
    bio: userStore.getUserStatus ? userStore.getUserStatus :'Unregistered'
  };

  return (
    <div
      className={classes.root}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
}));

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;