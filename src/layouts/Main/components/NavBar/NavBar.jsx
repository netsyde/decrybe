import React, { Fragment, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Divider, Paper, Avatar, Typography } from '@material-ui/core';
import { Hidden } from '@material-ui/core';

import useRouter from '../../../../utils/useRouter';
import { Navigation } from '../../../../components';
import navigationConfig from './navigationConfig';
import { observer, inject } from 'mobx-react';
import getInitials from '../../../../utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflowY: 'auto'
  },
  content: {
    padding: theme.spacing(2)
  },
  profile: {
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
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  navigation: {
    marginTop: theme.spacing(2)
  },
  testnet: {
    textAlign: "center"
  }
}));

function httpsFix(str) {
  str = str.replace('http://', 'https://')
  return str;

}

const User = inject('rootStore')(observer(({ rootStore }) => {
  const handleBrokenImage = e => (e.target.src = "/img/gag.png");
  const classes = useStyles(1);

  return (
    <div className={classes.profile}>
    <Avatar
      alt="Person"
      className={classes.avatar}
      component={RouterLink}
      //style={{backgroundColor: rootStore.user.getUserAvatarColor}}
      src={httpsFix(rootStore.user.getUserAvatar)}
      imgProps={{ onError: handleBrokenImage }}
      to={`/profile/${rootStore.user.getUserAddress}`}
    >
      {rootStore.user.getUserName ? getInitials(rootStore.user.getUserName) : "U"}
    </Avatar>
    <Typography
      className={classes.name}
      variant="h4"
    >
      {rootStore.user.name || "Guest"}
    </Typography>
    <Typography variant="body2">{rootStore.user.getUserBio || "Stranger"}</Typography>
  </div>
  )
}))

const NavBar = props => {
  const { openMobile, onMobileClose, className, ...rest } = props;

  const classes = useStyles(1);
  const router = useRouter();
  
  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }

  }, [router.location.pathname]);
  
  const navbarContent = (
    <div className={classes.content}>
      <User />
      <Divider className={classes.divider} />
      <nav className={classes.navigation}>
        {navigationConfig.map(list => (
          <Navigation
            component="div"
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <div
            {...rest}
            className={clsx(classes.root, className)}
          >
            {navbarContent}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square
        >
          {navbarContent}
          <Typography className={classes.testnet} variant="body2">Please use TESTNET</Typography>
        </Paper>
      </Hidden>
    </Fragment>
  );
};

export default NavBar;
