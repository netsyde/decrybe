import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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

const ConversationPlaceholder = props => {
  const { className, ...rest } = props;

  const classes = useStyles(props);

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
        <Typography variant="subtitle1">
          To start a conversation just click "Apply for a role" on Task page
        </Typography>
      </div>
    </div>
  );
};

export default ConversationPlaceholder;
