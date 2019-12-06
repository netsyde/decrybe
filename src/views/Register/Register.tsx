import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link,
  Avatar
} from '@material-ui/core';
import { Page } from '../../components';
import { RegisterForm } from './components';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: "#ffffff",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: "#ffffff",
    color: "#ffffff",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  registerForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Register = inject('rootStore')(observer(({ rootStore }) => {
  const classes = useStyles(1);
  const handleBrokenImage = e => (e.target.src = "/img/gag.png");

  if (rootStore.user.isUserReg) {
    rootStore.user.setShowRegister(false)
    console.log('user reg')
    return <Redirect to={`/overview`} />
  }
  

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography
            gutterBottom
            variant="h3"
          >
            Sign up
          </Typography>
          <Typography variant="subtitle2">
            Sign up on the Decrybe platform
          </Typography>
          <RegisterForm className={classes.registerForm} />
          <Divider className={classes.divider} />
          <Link
            align="center"
            color="secondary"
            component={RouterLink}
            onClick={() => rootStore.user.login()}
            to={"#"}
            underline="always"
            variant="subtitle2"
          >
            Have an account?
          </Link>
        </CardContent>
        <CardMedia
          className={classes.media}
          image="/img/auth/auth.png"
          title="Cover"
        >
          <Typography
            color="inherit"
            variant="subtitle1"
          >
            Decrybe — is a decentralized freelancing exchange.
            The exchange based on Web3 technologies,
            each user decides what information to disclose.
          </Typography>
          <div className={classes.person}>
            <Avatar
              alt="Person"
              className={classes.avatar}
              src={'/img/avatars/sgoldik.jpg'}
              imgProps={{ onError: handleBrokenImage }}

            > S </Avatar>
            <div>
              <Typography
                color="inherit"
                variant="body1"
              >
                Sgoldik
              </Typography>
              <Typography
                color="inherit"
                variant="body2"
              >
                Founder & CEO NetSyde
              </Typography>
            </div>
          </div>
        </CardMedia>
      </Card>
    </Page>
  );
}));

export default Register;
