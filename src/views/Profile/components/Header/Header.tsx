import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Typography,
  Button,
  Hidden,
  IconButton,
  Snackbar,
  Tooltip,
  colors
} from '@material-ui/core';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import { observer, inject } from 'mobx-react';
import getInitials from '../../../../utils/getInitials';
const useStyles = makeStyles(theme => ({
  root: {},
  cover: {
    position: 'relative',
    height: 260,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:before': {
      position: 'absolute',
      content: '" "',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage:
        'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
    },
    '&:hover': {
      '& $changeButton': {
        visibility: 'visible'
      }
    }
  },
  changeButton: {
    visibility: 'hidden',
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: colors.blueGrey[900],
    color: '#ffffff',
    [theme.breakpoints.down('md')]: {
      top: theme.spacing(3),
      bottom: 'auto'
    },
    '&:hover': {
      backgroundColor: colors.blueGrey[900]
    }
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1)
  },
  container: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    padding: theme.spacing(2, 3),
    margin: '0 auto',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  avatar: {
    //border: `2px solid ${'#ffffff'}`,
    height: 120,
    width: 120,
    top: -60,
    left: theme.spacing(3),
    position: 'absolute',
    fontSize: 50
  },
  details: {
    marginLeft: 136
  },
  actions: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1)
    },
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  pendingButton: {
    color: '#ffffff',
    backgroundColor: colors.red[600],
    '&:hover': {
      backgroundColor: colors.red[900]
    }
  },
  personAddIcon: {
    marginRight: theme.spacing(1)
  },
  mailIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Header = observer((props) => {
  const { className, rootStore, id, ...rest } = props;
  const [user, setUser] = useState();
  const classes = useStyles(1);

  useEffect(() => {
    async function getUser () {
      
      let data = await rootStore.users.getUserData(id)
      if (data) {
        console.log(data)
        setUser(data);
      } else {
        console.log('User Load error')
      }
    }
    if (rootStore.user.isLogin) {
      getUser()
    }
  }, []);
  const handleBrokenImage = e => (e.target.src = "/img/gag1.png");

  function httpsFix(str) {
    str = str.replace('http://', 'https://')
    return str;
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div
        className={classes.cover}
        style={{ backgroundImage: `url(${user ? user.cover : '/img/cover.png'})` }}
      >
        {
          rootStore.user.getUserAddress == id ?
            <Button
              className={classes.changeButton}
              variant="contained"
              component={RouterLink}
              to="/settings"
            >
              <AddPhotoIcon className={classes.addPhotoIcon} />
              Change Cover
            </Button> 
          : null
        } 
      </div>
      <div className={classes.container}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          //style={{backgroundColor: user ? user.avatarColor : "#000000"}}
          src={user ? httpsFix(user.avatar) : ""}
          imgProps={{ onError: handleBrokenImage }}
        >
          {user ? getInitials(user.name) : "U"}
        </Avatar>
        <div className={classes.details}>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            {user ? user.bio: ""}
          </Typography>
          <Typography
            component="h1"
            variant="h4"
          >
            {user ? user.name: ""}
          </Typography>
        </div>
        <Hidden smDown>
          <div className={classes.actions}>
            {rootStore.user.getUserAddress == id ? 
                <Button
                color="secondary"
                component={RouterLink}
                to="/settings"
                variant="contained"
              >
                <ChatIcon className={classes.mailIcon} />
                Edit profile
              </Button> 
                : null
            }
            <Tooltip title="More options">
              <IconButton>
                <MoreIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Hidden>
      </div>
    </div>
  );
});

export default Header;
