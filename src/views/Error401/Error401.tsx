import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, useTheme, useMediaQuery } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { Page } from '../../components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center'
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    maxWidth: '100%',
    width: 560,
    maxHeight: 300,
    height: 'auto'
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Error401 = inject('rootStore')(observer(({ rootStore }) => {
  const classes = useStyles(1);
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page
      className={classes.root}
      title="Decrybe | Please Sign In"
    >
      <Typography
        align="center"
        variant={mobileDevice ? 'h4' : 'h1'}
      >
        Please Sign In
      </Typography>
      <Typography
        align="center"
        variant="subtitle2"
      >
        Use the sign in button in the header of the site or click on the button below
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="Error 401"
          className={classes.image}
          src="/img/authentication_error.svg"
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          component={RouterLink}
          variant="outlined"
          to="/"
          onClick={() => rootStore.user.login()}
        >
          Sign In
        </Button>
      </div>
    </Page>
  );
}));

export default Error401;
