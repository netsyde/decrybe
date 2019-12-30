import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemIcon,
  colors
} from '@material-ui/core';
import getInitials from '../../../../../../utils/getInitials'
import { Label } from '../../../../../../components';
import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DetailsIcon from '@material-ui/icons/Details';

const useStyles = makeStyles(theme => ({
  active: {
    boxShadow: `inset 4px 0px 0px ${theme.palette.primary.main}`,
    backgroundColor: colors.grey[50]
  },
  avatar: {
    height: 40,
    width: 40
  },
  details: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  unread: {
    marginTop: 2,
    padding: 2,
    height: 18,
    minWidth: 18
  }
}));

const ConversationListItem = props => {
  const { active, rootStore, conversation, className, ...rest } = props;

  const classes = useStyles(props);
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const handleBrokenImage = e => (e.target.src = "/img/gag.png");
  return (
    <ListItem
      {...rest}
      button
      className={clsx(
        {
          [classes.active]: active
        },
        className
      )}
      component={RouterLink}
      to={`/chat/${conversation.uid}`}
    >
      <ListItemAvatar>
        <Avatar
          alt="Person"
          className={classes.avatar}
          src={conversation.user.avatar || ""}
          imgProps={{ onError: handleBrokenImage }}
        >
          {conversation.user.name ? getInitials(conversation.user.name) : ""}
        </Avatar>
      </ListItemAvatar>

      {conversation.task.freelancer == conversation.user.address  || conversation.task.freelancer == rootStore.user.getUserAddress ?
        <ListItemText
        primary={conversation.task.title.length > 20 ? ( conversation.task.title.substr(0, 20) + "...") : conversation.task.title}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'h6',
        }}
        secondary={`${lastMessage ? lastMessage.sender.name : ""}: ${lastMessage ? lastMessage.content : ""}`}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'body1'
        }}
      /> : 
      <ListItemText
        primary={conversation.task.title.length > 20 ? conversation.task.title.substr(0, 20) + "..." : conversation.task.title}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'h6',
        }}
        secondary={`${lastMessage ? lastMessage.sender.name : ""}: ${lastMessage ? lastMessage.content : ""}`}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'body1'
        }} />
      }
      <div className={classes.details}>

      {((conversation.task.freelancer == conversation.user.address  || conversation.task.freelancer == rootStore.user.getUserAddress) && conversation.task.status == "In progress") ? 
      <ListItemIcon>
        <DetailsIcon/>
      </ListItemIcon> : null}
      {((conversation.task.freelancer == conversation.user.address  || conversation.task.freelancer == rootStore.user.getUserAddress) && conversation.task.status == "Completed") ? 
      <ListItemIcon>
        <DoneAllIcon/>
      </ListItemIcon> : null}
      </div>
    </ListItem>
  );
};

export default ConversationListItem;
