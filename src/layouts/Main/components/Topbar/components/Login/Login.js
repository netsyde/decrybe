import { observer, inject } from 'mobx-react';
import React from 'react';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
}));

const Login = inject('userStore')(observer(({ userStore }) => {
  const classes = useStyles();
  console.log(userStore)
  if (!userStore.isUserLogin) {
    return (
      <Button onClick={() => userStore.login()} variant="contained" color="primary">Sign In</Button>
    )
  } else {
    return (
      <IconButton color="inherit" onClick={() => userStore.signOut()}>
        <InputIcon />
      </IconButton>
    )
  }
}))
  
export default Login;