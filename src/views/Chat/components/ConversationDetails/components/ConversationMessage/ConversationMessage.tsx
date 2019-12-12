import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link, Avatar, colors } from '@material-ui/core';
import { observer } from 'mobx-react';
import getInitials from '../../../../../../utils/getInitials'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  authUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& $body': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  inner: {
    display: 'flex',
    maxWidth: 500
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  body: {
    backgroundColor: colors.grey[100],
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2)
  },
  content: {
    marginTop: theme.spacing(1)
  },
  image: {
    marginTop: theme.spacing(2),
    height: 'auto',
    width: 380,
    maxWidth: '100%'
  },
  footer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  time: {

  }
}));

const ConversationMessage = observer((props) => {
  const { message, className, rootStore,...rest } = props;
  const handleBrokenImage = e => (e.target.src = "/img/gag.png");
  const classes = useStyles(props);
  if (rootStore.user.isUserLogin && rootStore.user.isUserReg) {
    return (
      <div
        {...rest}
        className={clsx(
          classes.root,
          {
            [classes.authUser]: message.sender.address == rootStore.user.getUserAddress
          },
          className
        )}
      >
        <div className={classes.inner}>
          <Avatar
            className={classes.avatar}
            component={RouterLink}
            src={message.sender.avatar || ""}
            imgProps={{ onError: handleBrokenImage }}
            to={`/profile/${message.sender.address}`}
          >
            {message.sender.name ? getInitials(message.sender.name) : ""}
            </Avatar>
          <div>
            <div className={classes.body}>
              <div>
                <Link
                  color="inherit"
                  component={RouterLink}
                  to={`/profile/${message.sender.address}`}
                  variant="h6"
                >
                  {message.sender.name == rootStore.user.getUserName ? 'Me' : message.sender.name}
                </Link>
              </div>
              <div className={classes.content}>
                  <Typography
                    color="inherit"
                    variant="body1"
                  >
                    {message.content}
                  </Typography>
              </div>
            </div>
            <div className={classes.footer}>
              <Typography
                variant="body2"
              >
                {message.created_at ? moment(message.created_at).fromNow() : ""}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
    } else {
      return null
    }
});

export default ConversationMessage;
