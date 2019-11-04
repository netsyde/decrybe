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

const Login = inject('rootStore')(observer(({ rootStore }) => {
  const classes = useStyles(1);
  console.log(rootStore)
  if (!rootStore.user.isUserLogin) {
    return (
      <Button onClick={() => rootStore.user.login()} variant="contained" color="primary">Sign In</Button>
    )
  } else {
    return (
      <IconButton color="inherit" onClick={() => rootStore.user.signOut()}>
        <InputIcon />
      </IconButton>
    )
  }
}))
  
export default Login;