import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inner: {
    textAlign: 'center'
  },
  image: {
    maxWidth: 400
  },
  title: {
    margin: theme.spacing(4, 0, 1, 0)
  }
}));

const ConversationPlaceholder = observer((props) => {
  const { className, rootStore, ...rest } = props;

  const classes = useStyles(props);
  if (!rootStore.user.isKeeperLocked) {
    return (
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.inner}>
          <img
            alt="Select conversation"
            className={classes.image}
            src="/img/undraw_work_chat_erdt.svg"
          />
          <Typography
            className={classes.title}
            variant="h4"
          >
            Select conversation to display
          </Typography>
        </div>
      </div>
    );
  } else {
    return (
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.inner}>
          <img
            alt="Select conversation"
            className={classes.image}
            src="/img/undraw_work_chat_erdt.svg"
          />
          <Typography
            className={classes.title}
            variant="h4"
          >
            Unlock Waves Keeper
          </Typography>
          <Typography variant="subtitle1">
            To use the chat unlock Waves Keeper (enter password)
          </Typography>
        </div>
      </div>
    );
  }
});

export default ConversationPlaceholder;
