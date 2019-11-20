import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Input,
  IconButton,
  Tooltip,
  Divider,
  List
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useRouter from '../../../../utils/useRouter';
import { ConversationListItem } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#ffffff'
  },
  searchInput: {
    flexGrow: 1
  }
}));

const ConversationList = props => {
  const { conversations, className, ...rest } = props;

  const classes = useStyles(props);
  const router = useRouter();
  const selectedConversation = router.match.params.id;

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder="Search contacts"
        />
        <Tooltip title="Search">
          <IconButton edge="end">
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      <List disablePadding>
        {conversations.map((conversation, i) => (
          <ConversationListItem
            active={conversation.id === selectedConversation}
            conversation={conversation}
            divider={i < conversations.length - 1}
            key={conversation.id}
          />
        ))}
      </List>
    </div>
  );
};

export default ConversationList;
