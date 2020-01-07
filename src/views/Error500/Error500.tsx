import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, useTheme, useMediaQuery } from '@material-ui/core';

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

const Error500 = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page
      className={classes.root}
      title="Error 404"
    >
      <Typography
        align="center"
        variant={mobileDevice ? 'h4' : 'h1'}
      >
        Ooops, something went terribly wrong!
      </Typography>
      <Typography
        align="center"
        variant="subtitle2"
      >
        {props.message}
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="Under development"
          className={classes.image}
          src="/img/undraw_server_down_s4lk.svg"
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          component={RouterLink}
          to="/"
          variant="outlined"
        >
          Back to home
        </Button>
      </div>
    </Page>
  );
};

export default Error500;
