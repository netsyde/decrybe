import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

import {
  ConversationToolbar,
  ConversationMessages,
  ConversationForm
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    flexGrow: 1
  }
}));

const ConversationDetails = props => {
  const { conversation, className, rootStore, ...rest } = props;

  const classes = useStyles(props);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ConversationToolbar conversation={conversation} rootStore={rootStore}/>
      <Divider />
      <ConversationMessages messages={conversation.messages} rootStore={rootStore}/>
      <Divider />
      <ConversationForm rootStore={rootStore} conversation={conversation}/>
    </div>
  );
};

export default ConversationDetails;
