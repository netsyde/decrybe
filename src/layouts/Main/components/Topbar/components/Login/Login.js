import { observer, inject } from 'mobx-react';
import React from 'react';
import Button from '@material-ui/core/Button';

const Login = inject('userStore')(observer(({ userStore }) => {
  console.log(userStore)
  return (
    <Button onClick={() => userStore.login()} variant="contained" color="primary">Login {userStore.isUserLogin ? "L" : "N"}</Button>

  )
}))
  
export default Login;