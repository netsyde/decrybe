import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, colors } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: colors.green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: '#e67e22',
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(2)
  }
}));

const CustomSnackbar = props => {
  const { open, onClose, message, type } = props;

  const classes = useStyles(props);
  if (type == 'success') {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        autoHideDuration={6000}
        onClose={onClose}
        open={open}
      >
        <SnackbarContent
          className={classes.success}
          message={
            <span className={classes.message}>
              <CheckCircleIcon className={classes.icon} />
              {message}
            </span>
          }
        />
      </Snackbar>
    );
  } else if (type == 'warning') {
    return (
    <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        autoHideDuration={6000}
        onClose={onClose}
        open={open}
      >
        <SnackbarContent
          className={classes.warning}
          message={
            <span className={classes.message}>
              <WarningIcon className={classes.icon} />
              {message}
            </span>
          }
        />
      </Snackbar>
    );
  } else if (type == 'error') {
    return (
      <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          autoHideDuration={6000}
          onClose={onClose}
          open={open}
        >
          <SnackbarContent
            className={classes.error}
            message={
              <span className={classes.message}>
                <ErrorIcon className={classes.icon} />
                {message}
              </span>
            }
          />
        </Snackbar>
      );
  } else if (type == 'info') {
    return (
      <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          autoHideDuration={6000}
          onClose={onClose}
          open={open}
        >
          <SnackbarContent
            className={classes.info}
            message={
              <span className={classes.message}>
                <InfoIcon className={classes.icon} />
                {message}
              </span>
            }
          />
        </Snackbar>
      );
  } else {
    return (
      <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          autoHideDuration={6000}
          onClose={onClose}
          open={open}
        >
          <SnackbarContent
            className={classes.info}
            message={
              <span className={classes.message}>
                <InfoIcon className={classes.icon} />
                {message}
              </span>
            }
          />
        </Snackbar>
      );
  }
};

CustomSnackbar.defaultProps = {
  open: true,
  onClose: () => {}
};

export default CustomSnackbar;
