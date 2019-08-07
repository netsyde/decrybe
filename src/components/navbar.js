import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  if (props.address != "Login") {
    return (
      <div className={classes.root}>
        <AppBar position={props.position}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              deLance
            </Typography>
            <Typography variant="h6">
              {props.address}, balance: {props.balance}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar position={props.position}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              deLance
            </Typography>
            <Button color="inherit" onClick={() => { props.auth() }}>{props.address}</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}