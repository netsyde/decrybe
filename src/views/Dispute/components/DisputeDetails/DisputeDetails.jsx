import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Divider,
  Typography,
  Link,
  colors
} from '@material-ui/core';
import { observer } from 'mobx-react';
import getInitials from '../../../../utils/getInitials';
import { Markdown } from '../../../../components';
import { DisputeToolbar, DisputeForm } from './components';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.disputes,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: theme.spacing(3, 3),
    display: 'flex',
    justifyContent: 'space-between'
  },
  receiver: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 56,
    width: 56,
    marginRight: theme.spacing(2)
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  message: {
    marginTop: theme.spacing(2),
    '& h1': {
      ...theme.typography.h1,
      marginBottom: theme.spacing(1)
    },
    '& h2': {
      ...theme.typography.h2,
      marginBottom: theme.spacing(1)
    },
    '& h3': {
      ...theme.typography.h3,
      marginBottom: theme.spacing(1)
    },
    '& h4': {
      ...theme.typography.h4,
      marginBottom: theme.spacing(1)
    },
    '& h5': {
      ...theme.typography.h5,
      marginBottom: theme.spacing(1)
    },
    '& h6': {
      ...theme.typography.h6,
      marginBottom: theme.spacing(1)
    },
    '& p': {
      ...theme.typography.subtitle1,
      marginBottom: theme.spacing(2)
    },
    '& ul': {
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(2)
    },
    '& ol': {
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(2)
    },
    '& li': {
      ...theme.typography.subtitle1,
      marginBottom: theme.spacing(1)
    },
    '& hr': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      backgroundColor: colors.grey[300],
      border: 0,
      height: 1
    },
    '& a': {
      color: colors.blue[800],
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  divider: {
    // paddingLeft: 3,
    // paddingRight: 3
  },
  moreButton: {}
}));

const DisputeMessage = observer((props) => {
  const { message, dispute } = props;

  const classes = useStyles(props);
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.receiver}>
          <Avatar
            className={classes.avatar}
            src={message.user.avatar}
          >
            {getInitials(message.user.name)}
          </Avatar>
          <div>
            <Link
              color="textPrimary"
              variant="h5"
              component={RouterLink}
              to={`/profile/${message.user ? message.user.address : "undefined"}`}
            >
              {message.user.name} ({message.user.address == dispute.freelancer ? "Freelancer" : "Customer"})
            </Link>
            <Typography variant="body2">
            {moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')} (block: {message.block})
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.content}>
        {/* <Typography variant="h1">{email.subject}</Typography> */}
        <Markdown
          className={classes.message}
          source={message.message}
        />
      </div>
      <Divider className={classes.divider}/>
    </div>
  )
})

const DisputeDetails = observer((props) => {
  const { dispute, rootStore, className, ...rest } = props;

  const classes = useStyles(props);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <DisputeToolbar dispute={dispute}/>
      <Divider />
      
      {dispute.messages ? dispute.messages.map(message => (
        <DisputeMessage message={message} dispute={dispute} key={message.key}/>
      )) : null}

      {(rootStore.user.getUserAddress == dispute.customer || rootStore.user.getUserAddress == dispute.freelancer) && dispute.status == "in dispute" ? 
      <DisputeForm rootStore={rootStore} dispute={dispute}/> : null}
    </div>
  );
});

export default DisputeDetails;
