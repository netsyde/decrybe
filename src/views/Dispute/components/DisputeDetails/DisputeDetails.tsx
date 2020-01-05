import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Divider,
  IconButton,
  Link,
  Tooltip,
  Typography
} from '@material-ui/core';
import { observer } from 'mobx-react';
import getInitials from '../../../../utils/getInitials';
import { Markdown } from '../../../../components';
import { DisputeToolbar, DisputeForm } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: "#fff",
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
    //marginTop: theme.spacing(2),
    '& > p': {
      ...theme.typography.subtitle1
    }
  },
  divider: {
    // paddingLeft: 3,
    // paddingRight: 3
  },
  moreButton: {}
}));

const DisputeMessage = observer((props) => {
  const { message } = props;

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
            <Typography
              display="inline"
              variant="h5"
            >
              {message.user.name}
            </Typography>
            <Typography variant="body2">
              {message.block}
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
      <DisputeToolbar />
      <Divider />
      
      {dispute.messages ? dispute.messages.map(message => (
        <DisputeMessage message={message} key={message.key}/>
      )) : null}

      {rootStore.user.getUserAddress == dispute.customer || rootStore.user.getUserAddress == dispute.freelancer ? 
      <DisputeForm rootStore={rootStore}/> : null}
    </div>
  );
});

export default DisputeDetails;
